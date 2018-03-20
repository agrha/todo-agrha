const express = require('express')
const router = express.Router()

const User = require('../controllers/users')
const Fblogin = require('../controllers/Fblogin')
const middleware = require('../middleware/fb')

// router.post('/signup',User.signUp)
// router.post('/signin',User.signIn)
router.post('/facebooklogin',middleware,Fblogin.signin)

    
module.exports=router;