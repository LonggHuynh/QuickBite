import React from 'react'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import { Routes, Route } from 'react-router-dom'
import Restaurant from './pages/Restaurant'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'

const App = () => {
  return (

    <div>
      <Navbar />
      <Routes>
        <Route exact path="" element={<Main />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/orders/" element={<Orders />} />  
        <Route path="/checkout/" element={<Checkout />} />  
      </Routes>
     </div>

  )
}

export default App