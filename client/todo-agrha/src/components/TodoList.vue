<template>
  <div>
    <p>Completed Tasks:{{todos.filter(todo=>{return todo.done === true}).length}}</p>
    <p>Completed Tasks:{{todos.filter(todo=>{return todo.done === false}).length}}</p>
       <todo
       v-for="todo in todos"
       v-on:complete-todo = "completeTodo"
       v-on:delete-todo="deleteTodo"
       :key="todo.id"
       v-bind:todo="todo">
       </todo>
  </div>
</template>

<script type = "text/javascript" >
import Todo from './Todo'
export default {
  props: ['todos'],
  components: {
    Todo
  },
  methods: {
    deleteTodo (todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos.splice(todoIndex, 1)
    },
    completeTodo (todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos[todoIndex].done = true
    }
  }
}
</script>

<style>
</style>
