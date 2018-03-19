const jwt = require('jsonwebtoken')

class Auth{
  static admin(req,res,next){
    let token = req.headers.token
    if(token){
      try {
          var decoded = jwt.verify(token,'secret key')
          console.log(decoded)
          if(decoded){
            if(decoded.user.role === 'admin'){
              next()
            } else {
              res.status(403).json({
                message:'you must be admin to access this endpoint'
              })
            }
          }
      } catch(error){
        res.status(401).json({
          message:'not authorized'
        })
      }
    } else {
      res.status(401).json({
        message:'login first please'
      })
    }
  }

  static registeredUser(req,res,next){
    let token = req.headers.token
    if(token){
      try {
          var decoded = jwt.verify(token,'secret key')
          console.log(decoded)
          if(decoded){
            if((decoded.user.role === 'user'&& decoded.id === Number(req.params.id))||decoded.role === 'admin') {
              next()
            } else {
              res.status(403).json({
                message:'you are not authorized'
              })
            }
          }
      } catch(error){
        res.status(401).json({
          message:'not authorized'
        })
      }
    } else {
      res.status(401).json({
        message:'login first please'
      })
    }
  }

}

module.exports = Auth