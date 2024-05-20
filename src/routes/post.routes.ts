import { Router } from "express";
import { create, getAll, getById, update, deleteById } from '../controllers/posts.controllers'
const router = Router()

router.get('/', getAll)

router.get('/:id', getById)

router.post('/create-post', create)

router.put('/update-post/:id', update)

router.delete('/delete-post/:id', deleteById)

export default router

