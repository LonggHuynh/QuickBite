import React from 'react'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import {Routes, Route} from 'react-router-dom'
import Restaurant from './pages/Restaurant'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="" element={<Main />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
      </Routes>
    </div>
  )
}

export default App