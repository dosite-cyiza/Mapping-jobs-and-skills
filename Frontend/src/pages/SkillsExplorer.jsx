import { useState, useEffect, useCallback } from 'react';

// Debounce function to limit API calls on search input
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SkillsExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    setSelectedSkill(null);

    try {
      const response = await fetch(`http://localhost:3000/api/skills/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to search for skills.');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const debouncedSearch = useCallback(debounce(performSearch, 500), [performSearch]);

  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, debouncedSearch]);

  const fetchSkillDetails = async (id) => {
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await fetch(`http://localhost:3000/api/skills/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch skill details.');
      }
      const data = await response.json();
      setSelectedSkill(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderDetails = () => {
    if (!selectedSkill) return null;

    const { label, description, occupations, relatedSkills } = selectedSkill;
    const isEssential = (type) => type === 'essential' ? 'text-green-500' : 'text-yellow-500';

    return (
      <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2 mt-8 animate-fade-in">
        <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2 text-pink-500">
            <span className="text-blue-600">Skill:</span> {label}
          </h2>
          <p className="text-gray-700 dark:text-gray-700">
            {description || 'No description available.'}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">
            <span className="text-purple-600">Occupations Requiring This Skill</span>
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {occupations.length > 0 ? (
              occupations.map(occ => (
                <li key={occ.id} className="text-gray-700 dark:text-gray-700">
                  <span className="font-semibold">{occ.label}</span>
                  <span className={`text-sm font-semibold ml-2 ${isEssential(occ.type)}`}>
                      ({occ.type})
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No occupations found for this skill.</li>
            )}
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">
            <span className="text-orange-600">Related Skills</span>
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {relatedSkills.length > 0 ? (
              relatedSkills.map(skill => (
                <li key={skill.id} className="text-gray-700 dark:text-gray-700">
                  <span className="font-semibold">{skill.label}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No related skills found.</li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-300 text-gray-900 dark:text-gray-900 p-8 flex flex-col items-center font-sans">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="w-full max-w-4xl bg-white dark:bg-gray-100 shadow-xl rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-gray-900">
          Skills Explorer
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-700 mb-8">
          Enter a skill to find its details and related occupations.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a skill..."
            className="text-gray-100 flex-grow p-4 rounded-full border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-100"
          />
        </div>
      </div>

      {loading && (
        <div className="text-center text-lg mt-8 animate-pulse">
          Loading data...
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg mt-8">
          {error}
        </div>
      )}

      {/* Search results list */}
      {searchResults.length > 0 && !selectedSkill && (
        <div className="w-full max-w-4xl bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg mt-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2 text-blue-800">
            Search Results
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {searchResults.map(item => (
              <li 
                key={item.id} 
                className="text-gray-700 dark:text-gray-700 cursor-pointer hover:underline"
                onClick={() => fetchSkillDetails(item.id)}
              >
                <span className="font-semibold">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Detailed view */}
      {renderDetails()}
    </div>
  );
};

export default SkillsExplorer;
