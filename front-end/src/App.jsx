import React from 'react'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Main />} />
      </Routes>
    </div>
  )
}

export default App