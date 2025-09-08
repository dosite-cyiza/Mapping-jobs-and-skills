import React from 'react';

const Card = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      {/* Card Title */}
      <h2 className="text-xl font-bold text-[#032147] mb-2">{title}</h2>
      {/* Description */}
      <p className="text-gray-600 mb-6">{description}</p>
      {/* Button */}
      <a href="#" className="w-full text-white font-semibold py-3 px-6 rounded-full transition-transform transform hover:scale-105 bg-gradient-to-r from-[#2B7669] to-[#032147]  shadow-md hover:shadow-lg">
        Click Here
      </a>
    </div>
  );
};

const ExploreTool = () => {
  const cardsData = [
    {
      title: "Occupation Decoder",
      description: "Find the Agilities needed for your dream job",
      icon: (
        <svg className="w-12 h-12 text-[#032147]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h2m12 0h2M3 13h2m18 0h2M9 13h6m-3-3v6m-3-3h6m9 0h-6V9a3 3 0 00-3-3H9a3 3 0 00-3 3v4h-6M13 3v2m6-2v2m-6 16v2m-6-2v2M5 9h2m12 0h2M3 13h2m18 0h2M9 13h6m-3-3v6m-3-3h6m9 0h-6V9a3 3 0 00-3-3H9a3 3 0 00-3 3v4h-6"/>
        </svg>
      )
    },
    {
      title: "Opportunity Explorer",
      description: "Discover the demand for an occupation by Agility",
      icon: (
        <svg className="w-12 h-12 text-[#032147]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.608 3.292 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Agilities Comparison",
      description: "Compare Agilities of several occupations at once",
      icon: (
        <svg className="w-12 h-12 text-[#032147]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Education Explorer",
      description: "Identify post-secondary options nationwide",
      icon: (
        <svg className="w-12 h-12 text-[#032147]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14v-8m0 0a2 2 0 01-2-2h-3a2 2 0 01-2-2m5-3a2 2 0 012 2v2m0 0a2 2 0 012 2h3a2 2 0 012 2m-16 6a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3a2 2 0 012-2M12 14v-8m0 0a2 2 0 01-2-2h-3a2 2 0 01-2-2m5-3a2 2 0 012 2v2m0 0a2 2 0 012 2h3a2 2 0 012 2m-16 6a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3a2 2 0 012-2" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center py-16 px-4 font-sans">
      {/* Main Container */}
      <div className="w-full max-w-7xl">
        {/* Header Title */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#032147] mb-12 uppercase tracking-wide">
          Check out another career explorer tool
        </h1>
        {/* Cards Container - Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreTool ;
