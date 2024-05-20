import { Router } from "express";
import { create, getAll, getById, update, deleteById } from '../controllers/users.controllers'
const router = Router()

router.get('/', getAll)

router.get('/:id', getById)

router.post('/create-user', create)

router.put('/update-user/:id', update)

router.delete('/delete-user/:id', deleteById)

export default router

