import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Tours from '../Pages/Tours'
import TourDetails from '../Pages/TourDetails'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import SearchResultList from '../Pages/SearchResultList'
import ThankYou from '../Pages/ThankYou'
import About from '../Pages/About'
import UserInfo from '../Pages/UserInfo'
import TourBooked from '../Pages/TourBooked'

import EditBooking from '../admin/EditBooking'
import EditTour from '../admin/EditTour'
import EditUser from '../admin/EditUser'
import EditReview from '../admin/EditReview'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/thank-you' element={<ThankYou />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path='/about' element={<About />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/tour-booked" element={<TourBooked />} />


      <Route path='/admin/tour' element={<EditTour />} />
      <Route path='/admin/user' element={<EditUser />} />
      <Route path='/admin/booking' element={<EditBooking />} />
      <Route path='/admin/review' element={<EditReview />} />
    </Routes>
  )
}

export default Routers