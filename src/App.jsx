import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/dash' element={<DashboardPage/>} />
        <Route path='/' element={<HomePage/>} />
      </Routes>
    </React.Fragment>
  )
}

export default App