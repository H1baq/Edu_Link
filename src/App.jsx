import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Program from './Components/Programs'
import About from './Components/About'
import Contacts from './Components/Contacts'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Program/>
      <About/>
      <Contacts/>
      <Footer/>

    </div>
  )
}

export default App
