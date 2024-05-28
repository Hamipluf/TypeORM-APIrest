import { Router } from "express";
import { create, getAll, getById, update, deleteById } from '../controllers/posts.controllers'
import { authMIddleware } from "../middlewares/auth.middleware";
const router = Router()

router.get('/', getAll)

router.get('/:id', getById)
// Solo si esta logeado puede crear un post 
router.post('/create-post', authMIddleware, create)

router.put('/update-post/:id', authMIddleware, update)

router.delete('/delete-post/:id', authMIddleware, deleteById)

export default router

