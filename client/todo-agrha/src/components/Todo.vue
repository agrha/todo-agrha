<template>
    <div class='ui centered card'>
      <div class="content" v-show="!isEditing">
        <div class='header'>
            {{ todo.name }}
        </div>
        <div class='extra content'>
          <span class='right floated edit icon' v-on:click="showForm">
              <button>Edit</button>
          </span>
          <span class='right floated trash icon' v-on:click="deleteTodo(todo._id)">
              <button>Delete</button>
          </span>
        </div>
      </div>
      <div class="content" v-show="isEditing">
        <div class='ui form'>
          <div class='field'>
            <label>Name</label>
            <input type='text' v-model="todo.name" >
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="hideForm">
              Close X
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class='ui bottom attached green basic button' v-if="!isEditing && todo.status" disabled>
          Completed
        </div>
        <div class='ui bottom attached red basic button' v-if="!isEditing && !todo.status"
        v-on:click="completeTodo(todo._id)">
            Pending
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
export default {
  props: ['todo'],
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    showForm () {
      this.isEditing = true
    },
    hideForm () {
      this.isEditing = false
    },
    deleteTodo (todo) {
      this.$emit('delete-todo', todo)
    },
    completeTodo (todo) {
      this.$emit('complete-todo', todo)
    }
  }
}
</script>
