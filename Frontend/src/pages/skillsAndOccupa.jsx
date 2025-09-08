import React, { useState, useEffect, useCallback } from 'react';

// Debounce function to limit API calls on search input
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SearchAndOccupations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('occupation'); // 'occupation' or 'skill'
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    setSelectedItem(null);

    try {
      const response = await fetch(`http://localhost:3000/api/${searchType}s/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`Failed to search for ${searchType}s.`);
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchType]);

  const debouncedSearch = useCallback(debounce(performSearch, 500), [performSearch]);

  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, searchType, debouncedSearch]);

  const fetchDetails = async (id) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`http://localhost:3000/api/${searchType}s/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${searchType} details.`);
      }
      const data = await response.json();
      setSelectedItem(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderDetails = () => {
    if (!selectedItem) return null;

    if (searchType === 'occupation') {
      const { occupation, requiredSkills, optionalSkills, relatedSkills, relatedOccupations } = selectedItem;
      return (
        <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2 mt-8 animate-fade-in">
          <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2 text-[#177C50]">
              <span className="text-[#032147]">Occupation:</span> {occupation.label}
            </h2>
            <p className="text-gray-900 dark:text-gray-900">
              {occupation.description || 'No description available.'}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-green-600">Essential Skills</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {requiredSkills.length > 0 ? (
                requiredSkills.map(skill => (
                  <li key={skill.ID} className="text-gray-900 dark:text-gray-900">
                    <span className="font-semibold">{skill.PREFERREDLABEL}</span>: {skill.DEFINITION}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No essential skills found.</li>
              )}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-yellow-600">Optional Skills</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {optionalSkills.length > 0 ? (
                optionalSkills.map(skill => (
                  <li key={skill.ID} className="text-gray-900 dark:text-gray-900">
                    <span className="font-semibold">{skill.PREFERREDLABEL}</span>: {skill.DEFINITION}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No optional skills found.</li>
              )}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-text-[#032147]">Related Occupations</span>
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {relatedOccupations.length > 0 ? (
                relatedOccupations.map(occ => (
                  <li key={occ.id} className="text-gray-900 dark:text-gray-900">
                    <span className="font-semibold">{occ.label}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No related occupations found.</li>
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
                  <li key={skill.id} className="text-gray-900">
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
    } else { // searchType === 'skill'
      const { label, description, occupations, relatedSkills } = selectedItem;
      const isEssential = (type) => type === 'essential' ? 'text-green-500' : 'text-yellow-500';
      return (
        <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2 mt-8 animate-fade-in">
          <div className="bg-white dark: p-6 rounded-2xl shadow-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
              <span className="text-[#032147]">Skill:</span> {label}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {description || 'No description available.'}
            </p>
          </div>
          <div className="bg-white  p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-[#032147]">Occupations Requiring This Skill</span>
            </h3>
            <ul className="pl-5 space-y-2">
              {occupations.length > 0 ? (
                occupations.map(occ => (
                  <li key={occ.id} className="text-black dark:text-black">
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-orange-600">Related Skills</span>
            </h3>
            <ul className="pl-5 space-y-2">
              {relatedSkills.length > 0 ? (
                relatedSkills.map(skill => (
                  <li key={skill.id} className="text-gray-700 dark:text-gray-300">
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
    }
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
          Career Skills and Occupations Explorer
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-700 mb-8">
          Search for an occupation or a skill to find related information.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search for a ${searchType}...`}
            className="flex-grow p-4 rounded-full border-2 border-gray-300 focus:outline-none transition-colors bg-gray-100 placeholder-gray-900 dark:placeholder-gray-400 text-black"
          />
          <button
            onClick={() => setSearchType(searchType === 'occupation' ? 'skill' : 'occupation')}
            className="p-4 rounded-full bg-gray-200 dark:bg-[#032147] text-gray-100 dark:text-gray-100 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-lg"
          >
            Switch to {searchType === 'occupation' ? 'Skills' : 'Occupations'}
          </button>
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
      {results.length > 0 && !selectedItem && (
        <div className="w-full max-w-4xl bg-white dark:bg-gray-100 p-6 rounded-2xl shadow-lg mt-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2 text-[#032147]">
            Search Results
          </h2>
          <ul className="pl-5 space-y-2">
            {results.map(item => (
              <li 
                key={item.id} 
                className="text-gray-900 dark:text-gray-900 cursor-pointer hover:underline"
                onClick={() => fetchDetails(item.id)}
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

export default SearchAndOccupations;
