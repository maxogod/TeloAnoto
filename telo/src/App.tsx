import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'

import { getSessionUser } from './utils/authHandling'

import LoadingPage from './components/loading/LoadingPage'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import HomePage from './components/main/home/HomePage'
import MapPage from './components/main/mapPage/MapPage'
import ProfilePage from './components/main/profile/ProfilePage'
import Book from './components/payments/Book'
import FilterBar from './components/utils/FilterBar'
import BackgroundMain from './components/utils/BackgroundMain'
import NotFound from './components/utils/NotFound'

function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(getSessionUser())
  const [currentHotelIndex, setCurrentHotelIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  })

  return (
    <HashRouter>
      <BackgroundMain />
      <FilterBar />
      <Routes>
        <Route path='/' element={
          loading ? <LoadingPage /> : (user ? <HomePage
            currentHotelIndex={currentHotelIndex}
            setCurrentHotelIndex={setCurrentHotelIndex} />
            : <Navigate to='/login' />)
        } />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login setUser={setUser} />} />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <SignUp setUser={setUser} />} />
        <Route path='/map' element={user ? <MapPage /> : <Navigate to='/login' />} />
        <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path='/book/:hotel_id/:room_id' element={user ? <Book /> : <Navigate to='/login' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}

export default App
