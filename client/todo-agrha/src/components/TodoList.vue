<template>
  <div style = 'margin-top 200px'>
      <NavBar/>
       <todo
       v-for="(todo, i) in todos" :key="i"
       v-on:complete-todo = "completeTodo"
       v-on:delete-todo= "deleteTodo"
       v-on:update-todo= 'updateTodo'
       v-bind:todo="todo">
       </todo>
    <create-todo
       v-on:create-todo= "addTodo">
    </create-todo>
  </div>
</template>

<script type = "text/javascript" >
import axios from 'axios'
import Todo from '@/components/Todo'
import CreateTodo from '@/components/CreateTodo'
import NavBar from '@/components/NavBar'
let url = `http://localhost:3000/todos`
export default {
  components: {
    Todo, CreateTodo, NavBar
  },
  data () {
    return {
      todos: []
    }
  },
  methods: {
    deleteTodo (todo) {
      console.log(todo)
      axios.delete(`${url}/${todo}`, {headers: {apptoken: localStorage.getItem('token')}})
        .then(response => {
          console.log(response)
          this.getTodo()
        })
        .catch((err) => {
          console.log('erorrrrrr ', err)
        })
    },
    completeTodo (todo) {
      axios.put(`${url}/${todo}/complete`, {}, {headers: {apptoken: localStorage.getItem('token')}})
        .then(response => {
          console.log(response)
          this.getTodo()
        })
        .catch((err) => {
          console.log('erorrrrrr ', err)
        })
    },
    addTodo (todo) {
      axios.post(`${url}`, todo, {headers: {apptoken: localStorage.getItem('token')}})
        .then(response => {
          console.log(response)
          this.getTodo()
        })
        .catch((err) => {
          console.log('erorrrrrr ', err)
        })
    },
    getTodo () {
      // let self = this
      axios.get(`${url}`, {headers: {apptoken: localStorage.getItem('token')}})
        .then(response => {
          // console.log(response.data.data)
          this.todos = response.data.data
        })
        .catch((err) => {
          console.log('erorrrrrr ', err)
        })
    },
    updateTodo (todo) {
      console.log(todo.id)
      console.log(todo.edit)
      axios.put(`${url}/${todo.id}`, todo.edit, {headers: {apptoken: localStorage.getItem('token')}})
        .then(response => {
          console.log('updated data', response)
          this.getTodo()
        })
        .catch(err => {
          console.log('error update data', err)
        })
    }
  },
  created () {
    this.getTodo()
  }
}
</script>

<style>
</style>
