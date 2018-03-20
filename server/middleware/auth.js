const jwt = require('jsonwebtoken')

class Auth{
  static user(req,res,next){
    jwt.verify(req.headers.token,'secret key',(err,decoded)=>{
      if(decoded){
        req.decoded = decoded.user
        next()
      } else {
        res.status(403).json({
          message:'you cant go in',
        })
      }
    })
  }

}

module.exports = Auth