import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js'
const router = express.Router()

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

//sua user
router.put('/:id', verifyUser, updateUser)

//xoa user
router.delete('/:id', verifyUser, deleteUser)

//get 1 user
router.get('/:id', verifyUser, getSingleUser)

//get all user
router.get('/', verifyAdmin, getAllUser)

export default router