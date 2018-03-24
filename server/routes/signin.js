const express = require('express')
const router = express.Router()

const UserController = require('../controllers/users')

router.post('/facebooklogin',UserController.loginFacebook)

    
module.exports=router;