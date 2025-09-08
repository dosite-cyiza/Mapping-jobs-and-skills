import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const ConversionAnimation = () => {
  const container = useRef(null);

  useEffect(() => {
    gsap.to(".dotted-line-left", {
      strokeDashoffset: -400,
      duration: 4,
      ease: "none",
      repeat: -1,
    });
    gsap.to(".dotted-line-right", {
      strokeDashoffset: 400,
      duration: 4,
      ease: "none",
      repeat: -1,
    });

    // Animate figures (bobbing)
    gsap.fromTo(
      ".job-seeker-figure",
      { y: 0 },
      { y: 10, duration: 1.5, ease: "sine.inOut", repeat: -1, yoyo: true }
    );

    gsap.fromTo(
      ".tabiya-figure",
      { y: 0 },
      { y: 10, duration: 1.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.25 }
    );

    gsap.fromTo(
      ".job-provider-figure",
      { y: 0 },
      { y: 10, duration: 1.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.5 }
    );
  }, []);
  console.log('barinda')

  return (
    <div
      ref={container}
      className="flex flex-col items-center justify-center bg-gray-300 text-white p-4 font-sans"
    >
      <div className=" border flex flex-col md:flex-row justify-between items-center w-full max-w-6xl shadow-2xl rounded-2xl bg-[#032147]">
        <div className="flex flex-col items-center p-4">
          <div className="text-lg md:text-xl font-bold mb-4">Job Seeker</div>
          <svg
            className="job-seeker-figure w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 85L50 50L35 35L65 35L50 50" stroke="#7EBAFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="20" r="15" fill="#7EBAFF" />
            <rect x="58" y="70" width="20" height="15" rx="3" fill="#7EBAFF" />
            <path d="M68 70V65C68 62.7909 66.2091 61 64 61H72C74.2091 61 76 62.7909 76 65V70" stroke="#7EBAFF" strokeWidth="2" />
          </svg>
        </div>

        {/* Left dotted line */}
        <div className="flex-1 flex justify-center items-center h-12 sm:h-16 md:h-20 w-full md:w-auto my-2 md:my-0">
          <svg className="w-full h-full" viewBox="0 0 200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <line className="dotted-line-left" x1="0" y1="10" x2="200" y2="10" stroke="#6EE7B7" strokeWidth="4" strokeDasharray="10 10" strokeDashoffset="0" strokeLinecap="round" />
          </svg>
        </div>

        {/* Tabiya */}
        <div className="flex flex-col items-center p-4">
          <div className="text-lg md:text-xl font-bold mb-4">Tabiya</div>
          <svg
            className="tabiya-figure w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 50 C25 20, 75 20, 95 50" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" fill="none" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
            <line x1="10" y1="50" x2="10" y2="70" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
            <line x1="90" y1="50" x2="90" y2="70" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Right dotted line */}
        <div className="flex-1 flex justify-center items-center h-12 sm:h-16 md:h-20 w-full md:w-auto my-2 md:my-0">
          <svg className="w-full h-full" viewBox="0 0 200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <line className="dotted-line-right" x1="0" y1="10" x2="200" y2="10" stroke="#6EE7B7" strokeWidth="4" strokeDasharray="10 10" strokeDashoffset="0" strokeLinecap="round" />
          </svg>
        </div>

        {/* Job Provider */}
        <div className="flex flex-col items-center p-4">
          <div className="text-lg md:text-xl font-bold mb-4">Job Provider</div>
          <svg
            className="job-provider-figure w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 85L50 50L35 35L65 35L50 50" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="20" r="15" fill="#FBBF24" />
            <rect x="25" y="70" width="50" height="10" rx="2" fill="#FBBF24" />
            <rect x="35" y="80" width="30" height="10" rx="2" fill="#FBBF24" />
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-400 px-4 sm:px-8">
        <p>This is conversation between a job seeker and a job provider.</p>
      </div>
    </div>
  );
};

export default ConversionAnimation;
