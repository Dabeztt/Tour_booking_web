import express from 'express'
import { createReview, getAllReview, updateReview, deleteReview } from '../controllers/reviewController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/:tourId', verifyUser, createReview)

router.get('/', getAllReview)

router.put('/', updateReview);

router.delete('/', deleteReview);

export default router