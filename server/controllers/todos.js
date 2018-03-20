const Todo = require('../models/Todos')

class TodoController {
  static createTodo(req,res){
    let todo = {
        name: req.body.name,
        userId :req.decoded._id,
        status : false
    }
    Todo.create(todo)
    .then(data=>{
      res.status(200).send({
        message:'todo created',
        data
      })
    })
    .catch(err=>{
      res.status(500).send({
        message:'something went wrong',
        err
      })
    })
  }

  static findTodo(req,res){
    Todo.find({
      userId:req.decoded._id
    })
    .populate('userId')
    .then(data=>{
      res.status(200).send({
        message:'your todolist',
        data
      })
    })
    .catch(err=>{
      res.status(500).send({
        message:'something went wrong',
        err
      })
    })
  }

  static deleteTodo(req,res){
    Todo.remove({_id:req.params.id})
    .then(data=>{
      res.status(200).send({
        message:'todo has been deleted'
      })
    })
    .catch(err=>{
      res.status(500).send({
        message:'something went wrong',
        err
      })
    })  
  }

  static editTodo(req,res){
    let todo = {
      name:req.body.name,
    }
    Todo.findOneAndUpdate({_id:req.params.id},todo)
    .then(data=>{
      res.status(200).send({
        message:'data updated succesfully',
        data
      })
    })
    .catch(err=>{
      res.status(500).send({
        message:'something went wrong',
        err
      })
    })
  }

  static completeTodo(req,res){
    Todo.findById(req.params.id)
    .then(data=>{
      data.status = !data.status
      data.save()
      .then(result=>{
        res.status(200).send({
          message:'todo status changed',
          data
        })
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

module.exports = TodoController