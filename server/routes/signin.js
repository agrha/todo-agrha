var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const authFacebook = require('../middleware/fb')

/* GET users listing. */
router.post('/',authFacebook.fbAuth)

module.exports = router;
