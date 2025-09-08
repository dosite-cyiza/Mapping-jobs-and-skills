import { motion } from "framer-motion"
import { useState } from "react"

import booklet from '../images/Spiral Bound Booklet.png';
import close from "../images/Close.png"
import logo from "../images/tabiya-logo-dm-color 1.png"
import menu from "../images/menu.png"
import dashboard from "../images/Dashboard Layout.png"
import personG from "../images/Person-g.png"
import person from "../images/Person.png"
import logout from '../images/Logout.png';
import { Link } from "react-router-dom";

export default function Navigation(){
  const [open, setOpen] = useState(true)
  const [account, setAccount] = useState(false)
  
  const handleClick = () => {
    setOpen(!open)
  }
  
  const handleAccount = () => {
    setAccount(!account)
    console.log(account)
  }
  
  const handleCloseAccount = () => {
    setAccount(false)
  }
  
  const handleBackdropClick = () => {
    setAccount(false)
  }
  
  return(
    <>
    <header className="lg:flex items-center justify-between lg:py-5 lg:px-15 pb-25">
      <nav className="fixed bg-white max-lg:p-5 max-lg:shadow-xl lg:bg-transparent lg:static flex items-center justify-between right-0 left-0 px-4 z-50">
      <div onClick={()=>handleClick()}>
        <img src={logo} alt="" className="w-15" />
      </div>
      <div onClick={()=>handleClick()} className="lg:hidden">
        <img src={menu} alt="" className="w-6" />
      </div>
       </nav>
      <aside className="">
        <ul className={`${open?"bottom-full":"bottom-100 h-120 py-20"} transition-all duration-300 overflow-hidden text-lg lg:text-sm lg:flex lg:static items-center gap-5 fixed bg-white lg:bg-transparent bottom-100 top-0 right-0 left-0 px-10 py-0 max-lg:space-y-8 text-[#032147] z-10`}>
           <li><Link to="/">Home</Link></li>
          <li><Link to="/AboutUs">About</Link></li>
          {/*
          <li><Link to="/Dashboard">Explore</Link></li> 
          */}
          <li onClick={()=>handleAccount()}><button className="bg-[#2B7669] max-lg:w-full text-white px-5 py-2 lg:py-2 rounded-2xl">Account</button></li>
         <div onClick={()=>handleClick()} className={`${!open?"inline":"hidden"} fixed lg:static right-5 top-5 lg:hidden`}>
          <img src={close} alt="" className="w-10" />
        </div>
        </ul>
        <div onClick={()=>handleClick()} className={`${open?"hidden":"block"} fixed lg:hidden top-0 bottom-0 right-0 left-0 bg-[#032047b1] z-9 backdrop-blur-sm`}></div>
      </aside>
      
      <div className="fixed lg:hidden bottom-0 right-0 left-0 h-15 bg-[#ffffff] rounded-t-2xl z-5 flex items-center [&>*]:mx-auto shadow-[0px_1px_4px_1px]">
        <motion.div 
         animate={{y:[0,-5,0]}}
        transition={{duration:0.8, repeat: Infinity}}
        >
        <div className="border-b-7 border-[#2B7669]">
          <img src={dashboard} alt="" className="w-10" />
        </div>
        </motion.div>
        <div>
          <img src={booklet} alt="" className="w-10" />
         </div>
        <div>
          <img src={person} alt="" className="w-10" />
         </div>
       </div>
      
      {/* Account Modal */}
      <div className={`${account ? "max-lg:scale-100 max-lg:opacity-100" : "scale-0 opacity-0"} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white p-5 space-y-10 z-[100] text-center text-xl text-[#2B7669] font-bold shadow-[1px_2px_10px_1px] rounded-2xl transition-all duration-300 ease-in-out`}>
        <div>
        <h1 className="text-xl">My Account</h1>
        </div>
        <div>
          <img src={personG} alt="" className="mx-auto" />
        </div>
        <div>
          <p>Yves Gambira Ntwari</p>
          <p className="font-light">Front-end developer</p>
        </div>
        <div>
          <button className="bg-[#2B7669] w-full text-white px-5 py-4 lg:py-2 rounded-2xl flex items-center justify-between">
            <span>Logout</span>
            <img src={logout} alt=""/>
          </button>
        </div>
                 
        <div className="absolute right-5 top-5 cursor-pointer" onClick={handleCloseAccount}>
          <img src={close} alt="" className="w-6 h-6" />
        </div>
      </div>
      
      {/* Backdrop */}
      <div 
        className={`${account ? "max-lg:block" : "hidden"} bg-[#2b766a7a] fixed top-0 left-0 bottom-0 right-0 z-[99] backdrop-blur-sm cursor-pointer`}
        onClick={handleBackdropClick}
      ></div>
    </header>
    </>
  )
}