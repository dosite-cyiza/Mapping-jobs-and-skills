import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import cors from 'cors';

// Fix __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const data = {};

// Function to read and parse a CSV file
const readCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, filePath))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(`Successfully loaded ${filePath}`);
        resolve(results);
      })
      .on('error', (err) => reject(err));
  });
};

const loadData = async () => {
  try {
    const filesToLoad = [
      './Tabiya (ESCO 1.1.1)_6/occupations.csv',
      './Tabiya (ESCO 1.1.1)_6/skills.csv',
      './Tabiya (ESCO 1.1.1)_6/occupation_to_skill_relations.csv',
      './Tabiya (ESCO 1.1.1)_6/skill_to_skill_relations.csv',
      './Tabiya (ESCO 1.1.1)_6/occupation_hierarchy.csv',
      './Tabiya (ESCO 1.1.1)_6/skill_hierarchy.csv',
      './Tabiya (ESCO 1.1.1)_6/occupation_groups.csv',
      './Tabiya (ESCO 1.1.1)_6/skill_groups.csv'
    ];

    const [
      occupationsCsv,
      skillsCsv,
      occupationToSkillRelationsCsv,
      skillToSkillRelationsCsv,
      occupationHierarchyCsv,
      skillHierarchyCsv,
      occupationGroupsCsv,
      skillGroupsCsv
    ] = await Promise.all(filesToLoad.map(readCsv));

    // Create maps and objects for fast lookup
    data.occupationsMap = new Map(occupationsCsv.map(o => [o.ID, o]));
    data.skillsMap = new Map(skillsCsv.map(s => [s.ID, s]));
    data.occupationGroupsMap = new Map(occupationGroupsCsv.map(g => [g.ID, g]));
    data.skillGroupsMap = new Map(skillGroupsCsv.map(g => [g.ID, g]));
    
    // Build relationships
    data.occupationsToSkills = occupationToSkillRelationsCsv.reduce((acc, curr) => {
        if (!acc[curr.OCCUPATIONID]) {
            acc[curr.OCCUPATIONID] = { essential: [], optional: [] };
        }
        if (curr.RELATIONTYPE === 'essential') {
            acc[curr.OCCUPATIONID].essential.push(curr.SKILLID);
        } else if (curr.RELATIONTYPE === 'optional') {
            acc[curr.OCCUPATIONID].optional.push(curr.SKILLID);
        }
        return acc;
    }, {});
    
    data.skillsToOccupations = {};
    occupationToSkillRelationsCsv.forEach(relation => {
        if (!data.skillsToOccupations[relation.SKILLID]) {
            data.skillsToOccupations[relation.SKILLID] = [];
        }
        data.skillsToOccupations[relation.SKILLID].push({
            occupationId: relation.OCCUPATIONID,
            relationType: relation.RELATIONTYPE
        });
    });

    data.skillsToSkills = skillToSkillRelationsCsv.reduce((acc, curr) => {
        if (!acc[curr.REQUIRINGID]) {
            acc[curr.REQUIRINGID] = [];
        }
        acc[curr.REQUIRINGID].push(curr.REQUIREDID);
        return acc;
    }, {});

    data.occupationHierarchy = {};
    occupationHierarchyCsv.forEach(relation => {
      if (!data.occupationHierarchy[relation.CHILDID]) {
        data.occupationHierarchy[relation.CHILDID] = [];
      }
      data.occupationHierarchy[relation.CHILDID].push(relation.PARENTID);
    });

    data.skillHierarchy = {};
    skillHierarchyCsv.forEach(relation => {
      if (!data.skillHierarchy[relation.CHILDID]) {
        data.skillHierarchy[relation.CHILDID] = [];
      }
      data.skillHierarchy[relation.CHILDID].push(relation.PARENTID);
    });

    console.log('All data loaded successfully. Server is ready.');
  } catch (err) {
    console.error('Failed to load CSV files:', err);
    process.exit(1);
  }
};

// ---- API Routes ----

// Search for occupations
app.get('/api/occupations/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const results = Array.from(data.occupationsMap.values())
        .filter(o => o.PREFERREDLABEL.toLowerCase().includes(query))
        .slice(0, 20)
        .map(o => ({
            id: o.ID,
            label: o.PREFERREDLABEL,
            description: o.DEFINITION || o.DESCRIPTION
        }));
    res.json(results);
});

// Get detailed occupation information
app.get('/api/occupations/:id', (req, res) => {
    const occupation = data.occupationsMap.get(req.params.id);
    if (!occupation) {
        return res.status(404).json({ error: 'Occupation not found.' });
    }

    const occupationSkills = data.occupationsToSkills[occupation.ID] || { essential: [], optional: [] };
    const requiredSkills = occupationSkills.essential.map(id => data.skillsMap.get(id)).filter(s => s);
    const optionalSkills = occupationSkills.optional.map(id => data.skillsMap.get(id)).filter(s => s);

    const relatedSkills = new Set();
    [...occupationSkills.essential, ...occupationSkills.optional].forEach(skillId => {
        const relatedSkillIds = data.skillsToSkills[skillId] || [];
        relatedSkillIds.forEach(relatedId => {
            if (data.skillsMap.get(relatedId)) {
                relatedSkills.add(data.skillsMap.get(relatedId));
            }
        });
    });

    const relatedOccupations = [];
    const mainOccupationSkillIds = new Set([...occupationSkills.essential, ...occupationSkills.optional]);
    const otherOccupations = Array.from(data.occupationsMap.values()).filter(occ => occ.ID !== occupation.ID);

    otherOccupations.forEach(otherOcc => {
        const otherOccSkills = data.occupationsToSkills[otherOcc.ID];
        if (otherOccSkills) {
            const sharedSkills = new Set();
            [...otherOccSkills.essential, ...otherOccSkills.optional].forEach(skillId => {
                if (mainOccupationSkillIds.has(skillId)) {
                    sharedSkills.add(skillId);
                }
            });

            if (sharedSkills.size >= 3) {
                relatedOccupations.push({
                    id: otherOcc.ID,
                    label: otherOcc.PREFERREDLABEL,
                    sharedSkillsCount: sharedSkills.size
                });
            }
        }
    });

    relatedOccupations.sort((a, b) => b.sharedSkillsCount - a.sharedSkillsCount);
    const topRelatedOccupations = relatedOccupations.slice(0, 5);

    res.json({
        occupation: {
            id: occupation.ID,
            label: occupation.PREFERREDLABEL,
            description: occupation.DEFINITION || occupation.DESCRIPTION
        },
        requiredSkills,
        optionalSkills,
        relatedSkills: Array.from(relatedSkills).slice(0, 10),
        relatedOccupations: topRelatedOccupations,
    });
});

// Search for skills
app.get('/api/skills/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const results = Array.from(data.skillsMap.values())
        .filter(s => s.PREFERREDLABEL.toLowerCase().includes(query))
        .slice(0, 20)
        .map(s => ({
            id: s.ID,
            label: s.PREFERREDLABEL,
            description: s.DESCRIPTION
        }));
    res.json(results);
});

// Get detailed skill information
app.get('/api/skills/:id', (req, res) => {
    const skill = data.skillsMap.get(req.params.id);
    if (!skill) {
        return res.status(404).json({ error: 'Skill not found.' });
    }

    const occupations = (data.skillsToOccupations[skill.ID] || []).map(relation => {
        const occupation = data.occupationsMap.get(relation.occupationId);
        return occupation ? {
            id: occupation.ID,
            label: occupation.PREFERREDLABEL,
            type: relation.relationType
        } : null;
    }).filter(o => o !== null);

    const relatedSkills = Array.from(new Set(
        data.skillsToSkills[skill.ID] || []
    )).slice(0, 10).map(id => {
        const relatedSkill = data.skillsMap.get(id);
        return relatedSkill ? { id: relatedSkill.ID, label: relatedSkill.PREFERREDLABEL } : null;
    }).filter(s => s !== null);

    res.json({
        id: skill.ID,
        label: skill.PREFERREDLABEL,
        description: skill.DESCRIPTION,
        occupations,
        relatedSkills
    });
});

// ---- Start the server ----
loadData().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
