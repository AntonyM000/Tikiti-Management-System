// LOADER, 
import React from 'react'
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Income from './pages/income'
import Expenses from './pages/expenses'
import Profile from './pages/profile'
import NotFound from './pages/notfound'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/' element={<Home/>}>
          <Route index element={<Dashboard/>} />
          <Route path='income' element={<Income/>}/>
          <Route path='expenses' element={<Expenses/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
