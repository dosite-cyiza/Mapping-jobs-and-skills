import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ConnectPart (){
    return (
        <>
        <section className="bg-[#032147] text-white p-4 md:p-18 ">
            <div className="text-center space-y-4 md:space-y-6">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold ">Let's Connect </h2>
                <p className="text-sm sm:text-xl">
                    Whether you're looking to learn more, explore a partnership,
                     or support our mission to build digital public
                     infrastructure for youth employment, we’d love to connect.
                </p>
            </div>
            
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center py-16">
        
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold">Request A Demo</h2>
          <img
            src="https://via.placeholder.com/150"
            alt="Ben Savonen"
            className="w-28 h-28 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold">Ben Savonen</h3>
            <p className="text-gray-300">Director, Innovation</p>
            <a
              href="mailto:ben@example.com"
              className="hover:underline mt-2 inline-block"
            >
              Email Ben
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold">Partner With Tabiya</h2>
          <img
            src="https://via.placeholder.com/150"
            alt="Nyambura Kariuki"
            className="w-28 h-28 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold">Nyambura Kariuki</h3>
            <p className="text-gray-300">Director, Community</p>
            <a
              href="mailto:nyambura@example.com"
              className=" hover:underline mt-2 inline-block"
            >
              Email Nyambura
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold">General Inquiries</h2>
          <img
            src="https://via.placeholder.com/150"
            alt="Christian Meyer"
            className="w-28 h-28 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold">Christian Meyer</h3>
            <p className="text-gray-300">CEO and Co-Founder</p>
            <a
              href="mailto:christian@example.com"
              className="hover:underline mt-2 inline-block"
            >
              Email Christian
            </a>
          </div>
        </div>
        
      </div>
  
    <div className=" py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="space-y-4 [&>*]:underline [&>*]:hover:underline">
          <a href="#" className="block  font-semibold">
            The Latest
          </a>
          <a href="#" className="block">
            Technology Documentation
          </a>
          <a href="#" className="block ">
            Terms & Privacy
          </a>
          <a href="#" className="block ">
            Compass Terms & Privacy
          </a>
        </div>

        <div className="space-y-4">
          <p>
            Tabiya c/o GDIS, 1401 K Street NW Suite 900 <br />
            Washington, DC 20005, <br />
            United States
          </p>
          <a
            href="mailto:hi@tabiya.org"
            className="font-semibold underline"
          >
            hi@tabiya.org
          </a>
        </div>
        <div className="space-y-4">
             <div className="space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-center space-x-6 text-2xl text-green-400">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300"
            >
              <FaLinkedin />
            </a>
          </div>
           <div className="text-sm text-gray-300">
            <p>© Copyright 2025 Tabiya.</p>
            <p>
              Photography by Fiseha Adugnaw, Barry Christianson, and Santiago
              Tascon for Tabiya.
            </p>
          </div>
        
        </div>
        
        </div>

      </div>

    </div>
    
        </section>
        
        </>
    )
}