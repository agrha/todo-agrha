<template>
  <nav class="navbar navbar-light navbar-static-top" role="navigation" style="background-color: #9999ff; margin-bottom: 0">
    <div class="navbar-header">
      <img src="@/assets/todo.png" height="40px" class="navbar-minimalize minimalize-styl-2" alt="Todo Fancy">
    </div>
    <ul class="nav navbar-top-links navbar-right" style="float: right;">
      <li v-if="token"><img alt="image" class="img-circle" :src="profileUrl" height="30px" /></li>
      <li v-if="!token"><a href="/login"><i class="fa fa-sign-in"></i> Log in</a></li>
      <li v-if="token"><a @click="logout()"><i class="fa fa-sign-out"></i> Log out</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      token: localStorage.getItem('token') || null,
      profileUrl: localStorage.getItem('profileUrl') || null
    }
  },
  methods: {
    logout () {
      window.FB.getLoginStatus(function (response) {
        // console.log(response)
        if (response.status === 'connected') {
          window.FB.logout(function (response) {
            console.log('logout ', response)
            localStorage.clear()
            window.location.href = '/login'
          })
        }
      })
    }
  }
}
</script>
