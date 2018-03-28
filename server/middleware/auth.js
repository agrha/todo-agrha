const jwt = require('jsonwebtoken')

class Auth{
  static user(req,res,next){
    console.log(req.headers)
    jwt.verify(req.headers.apptoken, 'secret key', (err, decoded) => {
      if (decoded) {
        req.decoded = decoded.user
        next()
      }  else {
        res.send({ message: 'You don\'t have authorization !!' })
      }
  })
  }
}

module.exports = Auth