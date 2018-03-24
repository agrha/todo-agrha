const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todos')
const auth = require('../middleware/auth')

router.get('/',auth.user,todoController.findTodo)
router.post('/',auth.user,todoController.createTodo)
router.put('/:id',auth.user,todoController.editTodo)
router.put('/:id/complete',auth.user,todoController.completeTodo)
router.delete('/:id',auth.user,todoController.deleteTodo)

module.exports = router