const express = require('express')
const router = express.Router()
const todoRouter = require('../controllers/todos')
const auth = require('../middleware/auth')

router.post('/',auth.user,todoRouter.createTodo)
router.get('/:id',auth.user,todoRouter.findTodo)
router.delete('/:id',auth.user,todoRouter.deleteTodo)
router.put('/:id',auth.user,todoRouter.editTodo)
router.put('/:id/complete',auth.user,todoRouter.completeTodo)

module.exports = router