import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//tao tour
router.post('/', verifyAdmin, createTour)

//sua tour
router.put('/:id', verifyAdmin, updateTour)

//xoa tour
router.delete('/:id', verifyAdmin, deleteTour)

//get 1 tour
router.get('/:id', getSingleTour)

//get all tour
router.get('/', getAllTour)

//tim kiem tour
router.get('/search/getTourBySearch', getTourBySearch)

//get featured tour
router.get('/search/getFeaturedTours', getFeaturedTour)

//count tour
router.get('/search/getTourCount', getTourCount)

export default router