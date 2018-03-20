const FB = require('fb')
const fb = new FB.Facebook({
    version:'v2.8'
})
const jwt = require ('jsonwebtoken')
const User = require ('../models/Users')
const Todo = require ('../models/Todos')

class UserController {
  static signinUser(req,res){
    FB.api('/me',{fields:['name','email']},function(response){
      User.findOne({email:response.email})
      .then(data=>{
        if(data){
          let payload ={
            email:data.email,
            name:data.name,
            id:data._id
          }
          Todo.find(
            {userId:req.headers.userid}
          )
          .populate('userId')
          .then(dataTodos=>{
            let token = jwt.sign(payload,'secret key')
            res.status(200).send({
              message:'heres your todo list',
              data: token,
              userdata: data,
              tododata:dataTodos
            })
          })
          .catch(err=>{
            res.status(500).send({
              message:'something went wrong',
              err
            })
          })
        } else {
          User.create({
            name:response.name,
            email:response.email
          })
          .then(createdUser =>{
            let user = {
              email:createdUser.email,
              name:createdUser.name,
              id:createdUser._id
            }
            let token = jwt.sign(user,'secret key')
            res.status(200).send({
              message:'user baru telah dibuat',
              data:token,
              user:createdUser
            })
          })
          .catch(err=>{
            res.status(500).send({
              message:'something went wrong',
              err
            })
          })
        }
      })
      .catch(err=>{
        res.status(500).send({
          message:'something went wrong',
          err
        })
      })
    })
  }
}

module.exports = UserController