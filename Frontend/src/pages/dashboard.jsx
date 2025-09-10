import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rect from '../images/Rectangle.jpg'
import GroupCategorySkillGraph from "../TabiyaMapping";


const Dashboard = () => {
  const [popupText, setPopupText] = useState("Welcome!");
  const words = [
    "Welcome!",
    "Know the opportunities of any Skills you have!",
    "Don't Miss Out!",
    "Explore the Skills",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % words.length;
      setPopupText(words[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="m-0 p-0 font-sans">
      <header className="w-[95%] h-[50px] lg:h-[60px] mx-auto mt-6 flex items-center gap-4 text-center">
        <nav className="hidden lg:flex gap-6 text-green-950">
          <span className="cursor-pointer hover:underline"><Link to="/Explore/Compare">Compare current skills & Occupations needs</Link></span>
          <span className="cursor-pointer hover:underline"><Link to="/Explore/SkillsExplorer">Skills Explorer</Link></span>
          <span className="cursor-pointer hover:underline"><Link to="/Explore/SearchOccupations">Occupations Explorer</Link> </span>
        </nav>
     
       
        <img
          src="../src/Pages/img/menu.png"
          alt="menu icon"
          className="h-6 ml-auto lg:hidden cursor-pointer"
        />
      </header>

      <section className="bg-[#D9D9D9] text-black w-[95%] mx-auto mt-5 p-4 rounded-md">
        <p className="text-[16px] md:text-[18px] leading-relaxed text-center">
          Tabiya builds open-source software and standards to unlock economic
          opportunity for all. We partner with government employment services,
          NGOs, and job platforms to create pathways that recognize skills from
          all work – including informal and traditionally unseen activities. Our
          mission is to make labor markets more efficient, equitable, and
          inclusive.
        </p>
      </section>
      <div
        className="h-52 sm:h-72 md:h-96 w-[95%] mx-auto mt-10 bg-cover rounded-xl overflow-hidden bg-gray-200"
      >
      <GroupCategorySkillGraph />
      </div>
      <div className="flex justify-center items-center bg-gray-100 mt-10 w-[95%] mx-auto mb-10">
        <div className="w-80 p-4 rounded-xl shadow-lg bg-white border border-gray-300 animate-slide-up">
          <p className="text-lg font-bold text-center">{popupText}</p>
        </div>
      </div>
      <section className="w-[95%] mx-auto mt-10 flex flex-wrap justify-center gap-5">
        {[
          { label: "Total Occupations", value: "3,000+", bg: "#D9D9D9", text: "#2B7669" },
          { label: "Occupation Groups", value: "650+", bg: "#032147", text: "white" },
          { label: "Skills", value: "14,000+", bg: "#D9D9D9", text: "#2B7669" },
          { label: "Associations", value: "130,000+", bg: "#032147", text: "white" },
          { label: "Skill Groups", value: "650+", bg: "#D9D9D9", text: "#2B7669" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="w-[45%] md:w-[30%] lg:w-[18%] h-28 flex flex-col justify-center items-center rounded-2xl"
            style={{ backgroundColor: item.bg, color: item.text }}
          >
            <h2 className="font-semibold text-center">{item.label}</h2>
            <p className="text-lg">{item.value}</p>
          </div>
        ))}
      </section>
      <div className="flex justify-center items-center bg-[#032147] text-white text-lg md:text-xl mt-10 w-[90%] md:w-[50%] lg:w-[30%] h-16 mx-auto mb-10 rounded-2xl cursor-pointer hover:bg-blue-900 transition">
        <p>Explore Yourself barinda </p>
      </div>
      <style>
        {`
        @keyframes slideUp {
          0% { transform: translateY(100%); opacity: 0; }
          50% { transform: translateY(-10%); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 1s ease-in-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
