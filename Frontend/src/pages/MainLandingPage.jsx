import { motion } from "framer-motion"
import download from '../images/Rectangle 4.png'
import download1 from '../images/mision.avif'
import ConnectPart from '../Component/ConnectPart'
import ConversionAnimation from '../Component/conversionAnimation'
import ExploreTool from '../Component/exploreTool'
import SearchAndOccupations from './skillsAndOccupa'
import GroupCategorySkillGraph from "../TabiyaMapping"
export default function MainLandingPage(){
  return (
    <>
      <ExploreTool />
     <ConversionAnimation />
     <SearchAndOccupations />
          <div className="bg-gray-50 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <br />
          
        </motion.div>

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

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>
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

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#032147]">Where We Work</h2>
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