const FB = require('fb')
const jwt = require ('jsonwebtoken')
const User = require ('../models/Users')
const Todo = require ('../models/Todos')

class UserController {
  static loginFacebook (req, res) {
    console.log('ini req body',req.body)
    FB.setAccessToken(req.body.token)
    FB.api('/me', { fields: 'name, email, picture' })
    .then(data => {
      User.findOne({
        name    : data.name,
        email   : data.email
      })
      .then(user => {
        if (user) {
          jwt.sign({ user }, 'secret key', (err, token) => {
            console.log(user)
            res.status(200).json({                
              message     : `new user ${user.name}`,
              name        : user.name, 
              email       : user.email,
              profileUrl  : user.picture,
              apptoken    : token,
            })
          })
        } else {
          User.create({
            name    : data.name,
            email   : data.email,
            picture : data.picture.data.url
          })
          .then(createdUser => {
            let user = createdUser
            jwt.sign({ user }, 'secret key', (err, token) => {
              // localStorage.setItem('apptoken',token)
              console.log(user)
              res.status(200).json({                
                message     : `new user ${user.name}`,
                name        : user.name, 
                email       : user.email,
                profileUrl  : user.picture,
                apptoken    : token,
              })
            })
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          message:'something went wrong',
          err
        })
      })
    })
  }
}

module.exports = UserController