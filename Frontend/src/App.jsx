import { useState } from 'react'
import './App.css'
import Footer from './component/Footer'
import AboutUs from './pages/AboutUs'
import MainLandingPage from './pages/MainLandingPage'
import Navigation from './component/navigation'
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login"
import HandleSignUp from "./pages/Signup";
import GeminiChatbot from './pages/map'
import Dashboard from './pages/dashboard'
import CompareSkillsAndOccupations from './pages/CampareSO'
import SkillsExplorer from './pages/SkillsExplorer'
import OccupationsExplorer from './pages/OccupationsExplorer '
import SearchAndOccupations from './pages/skillsAndOccupa'



function App() {


  return (
      <>
        <Router>
      <Navigation />
          <Routes>
            <Route path="/" element={<MainLandingPage/>}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<HandleSignUp />} />
            <Route path="/AI" element={<GeminiChatbot />} />
            <Route path="/Explore" element={<Dashboard />}></Route>
            <Route path="/Explore/Compare" element={<CompareSkillsAndOccupations />}></Route>
            <Route path="/Explore/SkillsExplorer" element={<SkillsExplorer />}></Route>
            <Route path="/Explore/SearchOccupations" element={<SearchAndOccupations />}></Route>
          </Routes>
            
          
      <Footer/>
        
        </Router>
      </>
     
  )
}

export default App
