import express from 'express';
import { createTodo, deleteTodo, getAllTodo, getSingleTodo, updateTodo} from '../../controllers/todoController.js'
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/" , authMiddleware , createTodo)
router.get("/" , getAllTodo)
router.get("/:id" , getSingleTodo)
router.put("/:id" ,authMiddleware , updateTodo)
router.delete("/:id" , deleteTodo)

export default router;