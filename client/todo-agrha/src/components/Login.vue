<template>
  <div>
    <div id=container>
      <div>
        <button class="btn btn-primary" :id="btnLogin" @click="getStatusFB()" type="button"><i class="fa fa-facebook-official"></i> {{btnLogin}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let url = 'http://localhost:3000/users'
export default {
  data () {
    return {
      btnLogin: 'Login With Facebook',
      token: localStorage.getItem('token') || null
    }
  },
  methods: {
    getStatusFB () {
      this.loginFB(e => {
        this.getProfileFB()
      })
    },
    loginFB (callback) {
      window.FB.login(function (response) {
        if (response.authResponse) {
          localStorage.setItem('fbtoken', response.authResponse.accessToken)
          callback(response)
        } else {
          console.log('Unknow connected facebook')
        }
      }, { scope: 'email,public_profile' })
    },
    getProfileFB () {
      console.log('fbtoken : ', localStorage.getItem('fbtoken'))
      axios.get(`${url}/login-fb`, {
        headers: {
          fbtoken: localStorage.getItem('fbtoken')
        }
      }).then(response => {
        console.log('data : ', response.data)
        this.token = response.data.apptoken
        localStorage.setItem('token', response.data.apptoken)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('email', response.data.email)
        window.location.href = '/'
      }).catch(err => console.error(err))
    }
  }
}
</script>
