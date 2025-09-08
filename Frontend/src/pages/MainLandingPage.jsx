import { motion } from "framer-motion"
import download from '../images/Rectangle 4.png'
import download1 from '../images/mision.avif'
import ConnectPart from '../Component/ConnectPart'
export default function MainLandingPage(){
  return (
    <>
          <div className="bg-gray-50 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <br />
          
        </motion.div>

        {/* Interactive Navigation Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
      
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#032147]">Explore Career Pathways</h2>
                <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600">
                  Navigate through occupation categories, discover specific careers, and explore the skills the market demands.
                  Each level provides deeper insights into the world of work.
                </p>
              </div>

            </div>
          </section>
        </motion.div>

        {/* Who We Are */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#032147]">Who We Are</h2>
                <p className="mb-4 text-base md:text-lg">
                  We are dedicated to building an open data ecosystem where skills and occupations are mapped, organized, and made accessible to everyone.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#00A99D]">Our Mission</h2>
              <div className="w-fulll  text-base md:text-lg space-y-6 ">
                <p className="border  p-5 rounded-2xl bg-[#37b0a0] text-white ">
                  Tabiya builds open-source software and standards to unlock economic opportunity
                  for all. We partner with government employment services, NGOs, and job platforms
                  to create pathways that recognize skills from all work – including informal and
                  traditionally unseen activities.
                  Our mission is to make labor markets more efficient, equitable, and inclusive.
                </p>

                <p className="border  p-5 rounded-2xl bg-[#37b0a0] text-white">
                  The youth workforce is growing, especially in low-
                  and middle-income countries. Millions of people gain skills informally,
                  yet labor markets often don't often recognize their value, creating barriers
                  to participation. Technology could help, but current solutions are expensive,
                  proprietary, and create fragmented systems that overlook informal skills and
                  prevent data sharing. We're on a mission to change that.
                  At Tabiya, we're building digital public infrastructure for jobs—creating open-source
                  technology that organizations can freely adapt to create more efficient, equitable
                  labor markets.
                </p>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Our Values with Image */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#032147]">Our Values</h2>
                <p className="mb-4 text-base md:text-lg">
                  Inclusion, transparency, and collaboration are at the core of everything we do.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download1} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#032147]">Where We Work</h2>
              {/* Map */}
              <div className="w-full h-64 md:h-96 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download} alt="" className="w-full h-full object-cover" />
              </div>
            
            </div>
          </section>
         
        </motion.div>
         
      <ConnectPart />
      </div>
    </>
  )
}