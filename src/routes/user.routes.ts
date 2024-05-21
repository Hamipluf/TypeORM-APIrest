import { Router } from "express";
import { create, getAll, getById, update, deleteById, login, getCurrentUser } from '../controllers/users.controllers'
import { authMIddleware } from "../middlewares/auth.middleware";
const router = Router()

router.get('/', getAll)

router.get('/current', authMIddleware, getCurrentUser)

router.get('/:id', getById)

router.post('/create-user', create)

router.post('/login', login)

router.put('/update-user/:id', update)

router.delete('/delete-user/:id', deleteById)

export default router

