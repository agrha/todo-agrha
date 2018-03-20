const express = require('express')
const router = express.Router()

const UserController = require('../controllers/users')
const Auth = require('../middleware/auth')

router.post('/facebooklogin',UserController.loginFacebook)

    
module.exports=router;