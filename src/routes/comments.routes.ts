import { Router } from "express";
import { create, deleteById, getAll, getById, update, getCommentsByPostId } from "../controllers/comments.controllers";
import { authMIddleware } from "../middlewares/auth.middleware";
const router = Router();



router.get("/", getAll);

router.get("/:id", getById);

router.post("/create-comment", authMIddleware, create);

router.get("/post/:postId", getCommentsByPostId);

router.put("/update-comment/:id", authMIddleware, update);

router.delete("/delete-comment/:id", authMIddleware, deleteById);

export default router;
