import { useState } from 'react'
import './App.css'
import Footer from './component/Footer'
import AboutUs from './pages/AboutUs'
import MainLandingPage from './pages/MainLandingPage'
import Navigation from './component/navigation'
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";


function App() {


  return (

      <>
      {/* <BrowserRouter> */}
        <Router>
      <Navigation />
          <Routes>
            <Route path="/" element={<MainLandingPage />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
          </Routes>
      <Footer/>
        </Router>
      {/* </BrowserRouter> */}
      </>
     
  )
}

export default App
