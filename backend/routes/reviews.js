import express from 'express'
import { createReview, getAllReview, updateReview, deleteReview } from '../controllers/reviewController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/:tourId', verifyUser, createReview)

router.get('/', verifyUser, getAllReview)

router.put('/', verifyUser, updateReview);

router.delete('/', verifyUser, deleteReview);

export default router