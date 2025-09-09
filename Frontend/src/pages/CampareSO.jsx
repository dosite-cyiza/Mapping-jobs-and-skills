import { useState, useEffect } from 'react';
import axios from 'axios';

function CompareSkillsAndOccupations() {
  const [currentSkills, setCurrentSkills] = useState('');
  const [targetOcc, setTargetOcc] = useState('');
  const [occupations, setOccupations] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load occupations on mount
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/occupations')
      .then(res => {
        console.log('Occupations loaded:', res.data.length);
        setOccupations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching occupations:', err);
        setError('Failed to load occupations');
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentSkills || !targetOcc) {
      setError('Please enter skills and select a target occupation');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    console.log('Sending analyze request:', { currentSkills, targetOcc });
    axios.post('http://localhost:5000/analyze', { currentSkillsText: currentSkills, targetOcc })
      .then(res => {
        console.log('Analyze response:', res.data);
        setResult(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error analyzing skills:', err);
        setError(err.response?.data?.error || 'Failed to analyze skills. Check backend logs.');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">Skills Gap Analyzer</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8 max-w-2xl mx-auto">
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Current Skills (comma-separated):</span>
          <input
            type="text"
            value={currentSkills}
            onChange={e => setCurrentSkills(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., coordinate construction activities, leadership"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Target Occupation:</span>
          <select
            value={targetOcc}
            onChange={e => setTargetOcc(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            {occupations.map(occ => (
              <option key={occ.id} value={occ.id}>{occ.label}</option>
            ))}
          </select>
        </label>
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {/* Error and Loading States */}
      {error && (
        <div className="max-w-2xl mx-auto text-red-500 text-center mb-6">{error}</div>
      )}
      {loading && (
        <div className="max-w-2xl mx-auto text-gray-600 text-center mb-6">Loading results...</div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">Results</h2>
          {result.error ? (
            <p className="text-red-500 text-center">{result.error}</p>
          ) : (
            <>
              {/* Percentage Bar */}
              <div className="mb-6 text-center">
                <p className="text-gray-700 font-medium">Skills Match Percentage: {result.percentage || 0}%</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                  <div 
                    className="bg-blue-500 h-4 rounded-full transition-all duration-300" 
                    style={{ width: `${result.percentage || 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Row 1: Skills You Have and Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Skills You Have */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">Skills You Have ({result.totalMatched || 0})</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {result.matchedSkills?.length > 0 ? (
                      result.matchedSkills.map(skill => (
                        <li key={skill.id} className="mb-1">{skill.label}</li>
                      ))
                    ) : (
                      <li className="text-gray-500">None matched</li>
                    )}
                  </ul>
                </div>

                {/* Missing Skills */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">Missing Skills ({result.totalMissing || 0})</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {result.missingSkills?.length > 0 ? (
                      result.missingSkills.map(skill => (
                        <li key={skill.id} className="mb-1">{skill.label}</li>
                      ))
                    ) : (
                      <li className="text-gray-500">No missing skills</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Row 2: Suggested Pathway and Training Resources */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Suggested Pathway */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">Suggested Pathway</h3>
                  <ol className="list-decimal pl-5 text-gray-600">
                    {result.suggestedPath?.length > 0 ? (
                      result.suggestedPath.map((step, i) => (
                        <li key={i} className="mb-1">{step}</li>
                      ))
                    ) : (
                      <li className="text-gray-500">No pathway available</li>
                    )}
                  </ol>
                </div>

                {/* Training Resources */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">Training Resources</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {result.training?.length > 0 ? (
                      result.training.map(res => (
                        <li key={res.skill} className="mb-1">
                          <a 
                            href={res.resource} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                          >
                            {res.skill}
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No training needed</li>
                    )}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CompareSkillsAndOccupations; 