<template>
  <div style = 'margin-top 200px'>
    <!-- <p>Completed Tasks:{{todos.filter(todo=>{return todo.done === true}).length}}</p>
    <p>Completed Tasks:{{todos.filter(todo=>{return todo.done === false}).length}}</p> -->
       <todo
       v-for="(todo, i) in todos" :key="i" 
       v-on:complete-todo = "completeTodo"
       v-on:delete-todo= "deleteTodo"
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
export default {
  components: {
    Todo, CreateTodo
  },
  data () {
    return {
      todos: []
    }
  },
  methods: {
    deleteTodo (todo) {
      console.log(todo)
      axios.delete(`http://localhost:3000/todos/${todo}`, {headers: { apptoken: localStorage.getItem('token')}})
        .then(response => {
          console.log(response)
          this.getTodo()
        })
        .catch((err) => {
          console.log('erorrrrrr ', err)
        })
    },
    completeTodo (todo) {
      axios.put(`http://localhost:3000/todos/${todo}/complete`,{}, {headers: { apptoken: localStorage.getItem('token')}})
        .then(response => {
          console.log(response)
          this.getTodo()
        })
        .catch((err) => {
          console.log('erorrrrrr ', err)
        })
    },
    addTodo (todo) {
      axios.post(`http://localhost:3000/todos/`,todo, {headers: { apptoken: localStorage.getItem('token')}})
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
      axios.get('http://localhost:3000/todos', {headers: { apptoken: localStorage.getItem('token')}})
        .then(response => {
          // console.log(response.data.data)
          this.todos = response.data.data
        })
        .catch((err) => {
          console.log('erorrrrrr ', err)
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
