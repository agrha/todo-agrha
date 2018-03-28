<template>
  <nav class="navbar navbar-light navbar-static-top" role="navigation" style="background-color: #9999ff; margin-bottom: 0">
    <ul class="nav navbar-top-links navbar-right" style= "float: right;">
      <li v-if="token"><img alt="image" class="img-circle" :src="profileUrl" height="40px" /></li>
      <div v-if='token'>
        <p class="btn btn-info btn-lg" @click= 'logout()' style='margin-left:15px'>
          <span class="glyphicon glyphicon-log-out"></span> Log out
        </p>
      </div>
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
            window.location.href = '/'
          })
        }
      })
    }
  }
}
</script>
