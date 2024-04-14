import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard/Dashboard'
import Settings from './pages/Settings/Settings'
import { Route, Routes } from 'react-router-dom'
import Coin from './components/Coin/Coin'
import Wallet from './pages/Wallet/Wallet'


const  App = () => {
  return (      
    <body>
      <Sidebar />
       <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<Settings />} />        
        <Route path="/coin" element={<Coin />} />   
        </Routes>

    </body>

  )
}

export default App