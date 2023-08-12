import { FC } from 'react'
import './assets/styles/app.css'
import './assets/styles/app.scss'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OTP from './components/otp/otpHandleBars'
import Header from './components/header/Header'
import SearchBar from './components/search/Search'
import UserProfile from './components/profile/UserProfile'
const App: FC = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='header-container'>
          <Header />
        </div>
        <Routes>
          <Route path='/user' element={<UserProfile />} />
          <Route path='/' element={<Navigate to='/login' replace></Navigate>}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<SearchBar />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify' element={<OTP />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
