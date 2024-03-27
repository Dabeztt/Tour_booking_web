import express from 'express'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import { createBooking, deleteBooking, getAllBooking, getBooking, updateBooking } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)

router.get('/:id', verifyUser, getBooking)

router.get('/', verifyAdmin, getAllBooking)

router.get('/', verifyUser, updateBooking)

router.get('/', verifyUser, deleteBooking)

export default router