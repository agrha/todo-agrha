<template>
<div class = 'todo'>
  <div id = 'tengah'>
    <div id = 'depan'>
      <fb-signin-button
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          <div class = 'content button'>
            <div id = 'welcome'>
              Login with Facebook
            </div>
          </div>
      </fb-signin-button>
    </div>
  </div>
  <img id="bg-img" src="../assets/todo.png" alt="todo">
</div>
</template>

<script>
import axios from 'axios'
import FB from 'fb'
let url = `http://35.185.45.157`

export default {
  name: 'Login',
  data () {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true
      }
    }
  },
  methods: {
    onSignInSuccess (response) {
      // console.log(response)
      FB.api('/me', {fields: 'name,email,id'}, dude => {
        let fbtoken = response.authResponse.accessToken
        axios.post(`${url}/signin/facebooklogin`, {'token': fbtoken})
          .then(resp => {
            console.log(resp.data)
            let fbtoken = resp.data.apptoken
            let email = resp.data.email
            let name = resp.data.name
            let profileUrl = resp.data.profileUrl
            localStorage.setItem('token', fbtoken)
            localStorage.setItem('email', email)
            localStorage.setItem('name', name)
            localStorage.setItem('profileUrl', profileUrl)
            this.$router.push('TodoList')
          })
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
#tengah {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
}
#depan {
  display:flex;
  width: 250px;
  height: 50px;
  background-color:white;
}
#bg-img{
  position: relative;
  z-index: -1;
  width: 100%;
  height: auto;
  background-image: url("../assets/todo.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
#tombol {
  padding-right:10px;
}
.content-button {
  align-items: center;
  padding-top: 7px;
  justify-content: center;
  display: flex;
}
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 100%;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  cursor: pointer;
}
</style>
