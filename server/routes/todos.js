const express = require('express')
const router = express.Router()
const todoRouter = require('../controllers/todos')
const auth = require('../middleware/auth')

router.post('/',auth.registeredUser,todoRouter.createTodo)
router.get('/:id',auth.registeredUser,todoRouter.findTodo)
router.delete('/:id',auth.registeredUser,todoRouter.deleteTodo)
router.put('/:id',auth.registeredUser,todoRouter.editTodo)
router.put('/:id/complete',auth.registeredUser,todoRouter.completeTodo)

module.exports = router