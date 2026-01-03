import express from 'express';
import { createTodo, deleteTodo, getAllTodo, getSingleTodo, updateTodo} from '../../controllers/todoController.js'

const router = express.Router();

router.post("/" , createTodo)
router.get("/" , getAllTodo)
router.get("/:id" , getSingleTodo)
router.put("/:id" , updateTodo)
router.delete("/:id" , deleteTodo)

export default router;