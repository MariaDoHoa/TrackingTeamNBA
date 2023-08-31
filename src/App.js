import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Detail from './Components/Detail/Detail'
import "./App.scss"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>NBA Score Tracking Team</h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/results/:teamCode' element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
