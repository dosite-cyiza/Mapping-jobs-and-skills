import React, { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import Graph from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { Sigma } from "sigma";

export default function GroupCategorySkillGraph() {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const allNodes = useRef([]); // For search
    const [graph, setGraph] = useState(null);
    const [data, setData] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // --- Load CSVs and build hierarchy ---
    useEffect(() => {
        const csvFiles = {
            groups: "/Tabiya/occupation_groups.csv",
            categories: "/Tabiya/occupations.csv",
            skills: "/Tabiya/skills.csv",
            groupToCategory: "/Tabiya/occupation_hierarchy.csv",
            categoryToSkill: "/Tabiya/occupation_to_skill_relations.csv",
        };

        const fetchCSV = (url) =>
            fetch(url)
                .then((res) => res.text())
                .then(
                    (text) =>
                        new Promise((resolve) => {
                            Papa.parse(text, {
                                header: true,
                                skipEmptyLines: true,
                                complete: (res) => resolve(res.data),
                            });
                        })
                );

        Promise.all(Object.values(csvFiles).map(fetchCSV)).then(
            ([groups, categories, skills, groupToCategory, categoryToSkill]) => {
                const groupsMap = new Map(groups.map((g) => [g.ID, g.PREFERREDLABEL]));
                const categoriesMap = new Map(categories.map((c) => [c.ID, c.PREFERREDLABEL]));
                const skillsMap = new Map(
                    skills.map((s) => [s.ID, { label: s.PREFERREDLABEL, essential: s.ESSENTIAL === "1" }])
                );

                // Build hierarchy
                const groupHierarchy = {};
                groupToCategory.forEach((rel) => {
                    const groupLabel = groupsMap.get(rel.PARENTID);
                    const categoryLabel = categoriesMap.get(rel.CHILDID);
                    if (groupLabel && categoryLabel) {
                        if (!groupHierarchy[groupLabel]) groupHierarchy[groupLabel] = {};
                        groupHierarchy[groupLabel][categoryLabel] = [];
                    }
                });

                const categoryToSkills = {};
                categoryToSkill.forEach((rel) => {
                    const categoryLabel = categoriesMap.get(rel.OCCUPATIONID);
                    const skillObj = skillsMap.get(rel.SKILLID);
                    if (categoryLabel && skillObj) {
                        if (!categoryToSkills[categoryLabel]) categoryToSkills[categoryLabel] = [];
                        categoryToSkills[categoryLabel].push(skillObj);
                    }
                });

                // Attach skills to categories
                Object.entries(groupHierarchy).forEach(([group, categories]) => {
                    Object.keys(categories).forEach((category) => {
                        if (categoryToSkills[category]) groupHierarchy[group][category] = categoryToSkills[category];
                    });
                });

                // Flatten nodes for search
                const flatNodes = [];
                Object.entries(groupHierarchy).forEach(([group, categories]) => {
                    flatNodes.push({ type: "group", label: group });
                    Object.entries(categories).forEach(([category, skills]) => {
                        flatNodes.push({ type: "category", label: category, parent: group });
                        skills.forEach((skill) =>
                            flatNodes.push({ type: "skill", label: skill.label, essential: skill.essential, parent: category })
                        );
                    });
                });
                allNodes.current = flatNodes;

                setData(groupHierarchy);
            }
        );
    }, []);

    // --- Initialize Sigma with Groups only ---
    useEffect(() => {
        if (!data || !Object.keys(data).length) return;

        const g = new Graph();
        let nodeId = 0;

        Object.keys(data).forEach((group) => {
            const groupNodeId = `group-${++nodeId}`;
            g.addNode(groupNodeId, {
                label: group,
                size: 12,
                color: "#2563eb",
                x: Math.random() * 500,
                y: Math.random() * 500,
                type: "circle",
                loaded: false,
            });
        });

        setGraph(g);

        // Initialize Sigma
        if (containerRef.current && containerRef.current.offsetWidth > 0) {
            requestAnimationFrame(() => {
                rendererRef.current = new Sigma(g, containerRef.current, {
                    renderEdgeLabels: false,
                    labelRendered: (node, context, settings) => {
                        const camera = rendererRef.current.getCamera();
                        const nodeAttributes = g.getNodeAttributes(node);

                        // Show/hide labels based on zoom level
                        if (nodeAttributes.size === 12 && camera.ratio < 0.8) return false; // hide group labels when zoomed out
                        if (nodeAttributes.size === 10 && camera.ratio < 1.5) return false; // hide category labels when zoomed out
                        if (nodeAttributes.size === 8 && camera.ratio < 2) return false; // hide skill labels when zoomed out
                        return true;
                    }
                });
            });
        }

        return () => {
            if (rendererRef.current) rendererRef.current.kill();
        };
    }, [data]);

    // --- Progressive loading ---
    const loadChildren = (nodeKey) => {
        if (!graph) return;
        const node = graph.getNodeAttributes(nodeKey);

        if (!node.loaded && node.size === 12) {
            const categories = data[node.label];
            let nodeId = graph.order;
            Object.entries(categories).forEach(([category, skills]) => {
                const catNodeId = `cat-${++nodeId}`;
                graph.addNode(catNodeId, {
                    label: category,
                    size: 10,
                    color: "#16a34a",
                    x: node.x + Math.random() * 50 - 25,
                    y: node.y + Math.random() * 50 - 25,
                    type: "circle",
                    loaded: false,
                    parent: nodeKey,
                    skills: skills,
                });
                graph.addEdge(nodeKey, catNodeId);
            });
            graph.setNodeAttribute(nodeKey, "loaded", true);
            forceAtlas2.assign(graph, { iterations: 30, settings: { gravity: 1 } });
        }

        if (!node.loaded && node.skills) {
            const skills = node.skills;
            let nodeId = graph.order;
            skills.forEach((skill) => {
                const skillNodeId = `skill-${++nodeId}`;
                graph.addNode(skillNodeId, {
                    label: skill.label,
                    size: 8,
                    color: skill.essential ? "#f59e0b" : "#9ca3af",
                    x: node.x + Math.random() * 30 - 15,
                    y: node.y + Math.random() * 30 - 15,
                    type: "circle",
                });
                graph.addEdge(nodeKey, skillNodeId);
            });
            graph.setNodeAttribute(nodeKey, "loaded", true);
            forceAtlas2.assign(graph, { iterations: 20, settings: { gravity: 1 } });
        }
    };

    // --- Click listener ---
    useEffect(() => {
        if (!rendererRef.current) return;
        const sigma = rendererRef.current;

        const clickListener = ({ node }) => loadChildren(node);
        sigma.on("clickNode", clickListener);

        return () => sigma.removeListener("clickNode", clickListener);
    }, [graph]);

    // --- Search logic ---
    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchValue(val);
        if (!val) return setSuggestions([]);
        const matches = allNodes.current
            .filter((n) => n.label.toLowerCase().includes(val.toLowerCase()))
            .slice(0, 5);
        setSuggestions(matches);
    };

    const handleSelectSuggestion = (item) => {
        setSearchValue(item.label);
        setSuggestions([]);

        const ensureParentsLoaded = (item) => {
            if (item.type === "category") {
                const groupNodeKey = Array.from(graph.nodes()).find(
                    (k) => graph.getNodeAttribute(k, "label") === item.parent
                );
                if (groupNodeKey && !graph.getNodeAttribute(groupNodeKey, "loaded")) loadChildren(groupNodeKey);
            }
            if (item.type === "skill") {
                const categoryNodeKey = Array.from(graph.nodes()).find(
                    (k) => graph.getNodeAttribute(k, "label") === item.parent
                );
                if (categoryNodeKey && !graph.getNodeAttribute(categoryNodeKey, "loaded")) loadChildren(categoryNodeKey);

                const categoryNode = allNodes.current.find((n) => n.label === item.parent);
                if (categoryNode) ensureParentsLoaded(categoryNode);
            }
        };

        ensureParentsLoaded(item);

        setTimeout(() => {
            const targetNodeKey = Array.from(graph.nodes()).find(
                (k) => graph.getNodeAttribute(k, "label") === item.label
            );
            if (targetNodeKey && rendererRef.current) {
                const camera = rendererRef.current.getCamera();
                const { x, y } = rendererRef.current.getNodeDisplayData(targetNodeKey);
                camera.animate({ x, y, ratio: 1 }, { duration: 600 });
            }
        }, 400);
    };

    return (
        <div className="relative w-full h-screen">
            {/* Search bar */}
            <div className="absolute top-2 right-2 z-50 p-2 bg-white rounded shadow w-64">
                <input
                    type="text"
                    placeholder="Search group/category/skill..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="border rounded px-2 py-1 w-full"
                />
                {suggestions.length > 0 && (
                    <div className="bg-white border mt-1 rounded shadow">
                        {suggestions.map((s, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelectSuggestion(s)}
                                className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                            >
                                {s.label} ({s.type})
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="absolute top-2 left-2 z-50 bg-white p-2 rounded shadow">
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full inline-block" /> Group
                </div>
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-green-600 rounded-full inline-block" /> Category
                </div>
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" /> Essential Skill
                </div>
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-gray-400 rounded-full inline-block" /> Non-Essential Skill
                </div>
            </div>

            {/* Graph container */}
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
}
 