import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/TodoList.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'LoginComponent',
      component: Login
    },
    {
      meta: {auth: true},
      path: '/todolist',
      name: 'TodoList',
      component: TodoList
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({name: 'LoginComponent'})
    }
  } else {
    next()
  }
})

export default router
