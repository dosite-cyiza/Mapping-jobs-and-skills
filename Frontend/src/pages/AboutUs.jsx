import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#032147] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Tabiya</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Connecting people, skills, and opportunities through an inclusive taxonomy
            that recognizes both formal and informal work.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#032147]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-md md:text-lg text-[#032147] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tabiya builds open-source software and standards to unlock economic
            opportunity for all. We partner with government employment services, NGOs,
            and job platforms to create pathways that recognize skills from all work,
            including informal and traditionally unseen activities.
          </motion.p>
        </div>
      </section>

      {/* What We Do / Challenge Section */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <motion.div
            className="bg-white p-10 rounded-2xl shadow-md space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-[#032147] text-center">What We Do</h3>
            <p className="text-md text-[#032147]">
              The youth workforce is growing rapidly, especially in low- and middle-income countries.
              Millions gain skills informally, yet labor markets often don’t recognize their value,
              creating barriers to participation. Tabiya builds open-source digital infrastructure for jobs,
              helping organizations create more efficient, equitable labor markets.
            </p>
            <p className="text-md text-[#032147]">
              A major challenge is navigating our taxonomy of thousands of occupations, skills,
              and relationships. We make this data visible, navigable, and interactive to help people
              explore career pathways, understand labor market trends, and match skills to opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-[#032147] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-12 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Impact
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white text-[#032147] p-6 rounded-lg shadow">
              <h3 className="font-bold text-2xl">3</h3>
              <p>Pilot programs in 3 countries including South Africa, Kenya, and Ethiopia</p>
            </div>
            <div className="bg-white text-[#032147] p-6 rounded-lg shadow">
              <h3 className="font-bold text-2xl">3,689</h3>
              <p>Relationships between informal skills and formal sector occupations</p>
            </div>
            <div className="bg-white text-[#032147] p-6 rounded-lg shadow">
              <h3 className="font-bold text-2xl">100%</h3>
              <p>All parts of our tech stack evaluated using randomized control trials</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Source / Technologies */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#032147]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Open-Source Technology
          </motion.h2>
          <motion.p
            className="text-md md:text-lg text-[#032147] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tabiya’s platform is fully open-source, allowing organizations to adopt, adapt,
            and integrate our technology to create inclusive labor markets. Our tools include
            AI-powered matching engines, standardized skill taxonomies, and data visualization
            solutions.
          </motion.p>
        </div>
      </section>

      {/* Call To Action */}
      <section id="contact" className="bg-[#032147] text-white py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join Us in Shaping the Future of Work</h2>
          <p className="text-md md:text-lg">
            Whether you’re a government, NGO, or job platform, collaborate with us to create
            more inclusive labor markets worldwide.
          </p>
        </div>
      </section>

    </>
  );
}
