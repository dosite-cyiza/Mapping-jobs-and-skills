const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const csv = require('csv-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const PriorityQueue = require('priorityqueuejs');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Data structures
let occupations = {};
let skills = {};
let occSkills = {};
let occHierarchy = {};
let skillLookup = {};
let precomputedGraph = {};

async function loadCSV(file) {
  const results = [];
  const filePath = path.join(__dirname, 'Tabiya (ESCO 1.1.1)_6', file);
  try {
    await fsPromises.access(filePath);
    return new Promise((resolve) => {
      fs.createReadStream(filePath)
        .pipe(csv({ columns: true }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => {
          console.error(`Error reading ${file}:`, err.message);
          resolve([]);
        });
    });
  } catch (err) {
    console.error(`File ${filePath} not found:`, err.message);
    return [];
  }
}

// Precompute static graph edges
async function precomputeGraph() {
  const allOccs = Object.keys(occupations);
  allOccs.forEach(occ => precomputedGraph[occ] = {});
  Object.keys(occHierarchy).forEach(parent => {
    if (!precomputedGraph[parent]) {
      precomputedGraph[parent] = {};
    }
  });
  Object.entries(occHierarchy).forEach(([parent, children]) => {
    children.forEach(child => {
      if (!occSkills[parent] || !occSkills[child]) {
        console.warn(`Skipping hierarchy edge: parent=${parent}, child=${child} not in occSkills`);
        return;
      }
      const parentSkills = new Set([...(occSkills[parent]?.essential || [])]);
      const childEss = occSkills[child]?.essential || new Set();
      const newSkills = new Set([...childEss].filter(s => !parentSkills.has(s)));
      if (newSkills.size < 10) {
        precomputedGraph[parent][child] = newSkills.size;
      }
    });
  });
  console.log('Precomputed graph size:', Object.keys(precomputedGraph).length);
}

// Load all data
const files = [
  'occupations.csv',
  'skills.csv',
  'occupation_to_skill_relations.csv',
  'occupation_hierarchy.csv',
  'skill_hierarchy.csv',
  'skill_to_skill_relations.csv',
  'skill_groups.csv',
  'occupation_groups.csv',
  'model_info.csv'
];

Promise.all(files.map(async file => {
  const data = await loadCSV(file);
  try {
    if (file === 'occupations.csv') {
      data.forEach(row => {
        occupations[row.ID] = { label: row.PREFERREDLABEL, description: row.DESCRIPTION };
      });
    } else if (file === 'skills.csv') {
      data.forEach(row => {
        skills[row.ID] = { label: row.PREFERREDLABEL, description: row.DESCRIPTION };
        skillLookup[row.PREFERREDLABEL.toLowerCase()] = row.ID;
      });
    } else if (file === 'occupation_to_skill_relations.csv') {
      data.forEach(row => {
        if (!row.OCCUPATIONID || !row.SKILLID || !['essential', 'optional'].includes(row.RELATIONTYPE)) {
          console.warn(`Skipping invalid row in occupation_to_skill_relations.csv:`, row);
          return;
        }
        if (!occSkills[row.OCCUPATIONID]) {
          occSkills[row.OCCUPATIONID] = { essential: new Set(), optional: new Set() };
        }
        occSkills[row.OCCUPATIONID][row.RELATIONTYPE].add(row.SKILLID);
      });
    } else if (file === 'occupation_hierarchy.csv') {
      data.forEach(row => {
        if (!occHierarchy[row.PARENTID]) occHierarchy[row.PARENTID] = [];
        occHierarchy[row.PARENTID].push(row.CHILDID);
      });
    }
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
})).then(async () => {
  await precomputeGraph();
  console.log('All files loaded');
  app.listen(port, () => console.log(`Backend running on port ${port}`));
}).catch(err => console.error('Error loading files:', err));

function matchSkills(textSkills) {
  console.log('Matching skills for input:', textSkills);
  const matched = [];
  const unmatched = [];
  if (!textSkills) return matched;
  textSkills.split(',').forEach(text => {
    text = text.trim().toLowerCase();
    if (skillLookup[text]) {
      matched.push(skillLookup[text]);
    } else {
      let found = false;
      for (const [label, id] of Object.entries(skillLookup)) {
        if (label.includes(text)) {
          matched.push(id);
          found = true;
          break;
        }
      }
      if (!found) unmatched.push(text);
    }
  });
  console.log('Matched skills:', matched);
  if (unmatched.length > 0) console.log('Unmatched skills:', unmatched);
  return matched;
}

function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue((a, b) => distances[b] - distances[a]);
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
    pq.enq(node);
  });
  distances[start] = 0;

  while (!pq.isEmpty()) {
    const current = pq.deq();
    if (current === end) break;

    for (const [neighbor, weight] of Object.entries(graph[current] || {})) {
      const alt = distances[current] + weight;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
        pq.enq(neighbor);
      }
    }
  }

  const path = [];
  let u = end;
  while (u) {
    path.unshift(u);
    u = previous[u];
  }
  console.log('Dijkstra path:', path);
  return { path: path.length > 1 ? path : [], length: distances[end] };
}

function buildGraph(currentSkillsSet) {
  const graph = { ...precomputedGraph };
  const start = 'start';
  graph[start] = {};
  Object.keys(occupations).forEach(occ => {
    const occEss = occSkills[occ]?.essential || new Set();
    const newSkills = new Set([...occEss].filter(s => !currentSkillsSet.has(s)));
    graph[start][occ] = newSkills.size;
  });
  console.log('Graph size:', Object.keys(graph).length);
  return graph;
}

app.get('/occupations', (req, res) => {
  console.log('Serving occupations:', Object.keys(occupations).length);
  res.json(Object.entries(occupations).map(([id, {label}]) => ({id, label})));
});

app.get('/skills', (req, res) => {
  console.log('Serving skills:', Object.keys(skills).length);
  res.json(Object.entries(skills).map(([id, {label}]) => ({id, label})));
});

app.get('/skills_for_occupation/:id', (req, res) => {
  const id = req.params.id;
  console.log('Serving skills for occupation:', id);
  res.json(occSkills[id] || {essential: [], optional: []});
});

app.post('/analyze', async (req, res) => {
  console.time('analyze');
  console.log('Received analyze request:', req.body);
  const { currentSkillsText, targetOcc } = req.body;
  if (!targetOcc || !occupations[targetOcc]) {
    console.timeEnd('analyze');
    console.log('Invalid target occupation:', targetOcc);
    return res.status(400).json({ error: 'Invalid target occupation' });
  }
  console.time('matchSkills');
  const currentSkills = matchSkills(currentSkillsText || '');
  console.timeEnd('matchSkills');
  const currentSet = new Set(currentSkills);

  const targetEss = occSkills[targetOcc]?.essential || new Set();
  console.log('Target occupation essential skills:', [...targetEss]);
  const missing = [...targetEss].filter(s => !currentSet.has(s)).map(s => ({
    id: s,
    label: skills[s]?.label || 'Unknown skill'
  }));
  
  const matched = [...targetEss].filter(s => currentSet.has(s)).map(s => ({
    id: s,
    label: skills[s]?.label || 'Unknown skill'
  }));
  
  const totalRequired = targetEss.size;
  const matchedCount = matched.length;
  const percentage = totalRequired > 0 ? Math.round((matchedCount / totalRequired) * 100) : 0;

  console.time('buildGraph');
  const graph = buildGraph(currentSet);
  console.timeEnd('buildGraph');
  console.time('dijkstra');
  const { path, length } = dijkstra(graph, 'start', targetOcc);
  console.timeEnd('dijkstra');
  const pathLabels = path.map(p => p === 'start' ? 'Current Position' : occupations[p]?.label || 'Unknown occupation');

  const training = missing.map(skill => ({
    skill: skill.label,
    resource: `https://www.coursera.org/search?query=learn+${encodeURIComponent(skill.label)}`
  }));

  console.log('Analyze response:', { missingSkills: missing.length, matchedSkills: matched.length, percentage, path: pathLabels });
  console.timeEnd('analyze');
  res.json({ 
    missingSkills: missing, 
    totalMissing: missing.length, 
    matchedSkills: matched, 
    totalMatched: matchedCount, 
    percentage, 
    suggestedPath: pathLabels, 
    training 
  });
});