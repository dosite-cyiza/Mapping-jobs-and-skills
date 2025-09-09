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
          </Routes>
      <Footer/>
        </Router>
      </>
     
  )
}

export default App
