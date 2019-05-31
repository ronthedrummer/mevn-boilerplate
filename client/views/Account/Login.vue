<template>
  <div class="login-form container">
    <form class="px-4 py-3 row mt-5" v-on:submit.prevent="submitLogin">
      <h2 class="col-sm-12 col-md-4 offset-md-4 mb-5">Login</h2>
      <div
        v-if="loginError"
        class="col-sm-12 alert alert-danger"
        role="alert"
      >There was a problem logging in.</div>
      <div class="form-group col-sm-12 col-md-4 offset-md-4">
        <label for="email">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="email@example.com"
        >
      </div>
      <div class="form-group col-sm-12 col-md-4 offset-md-4">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password"
        >
      </div>
      <!-- <div class="form-check form-group col-sm-12 col-md-4 offset-md-4">
        <input type="checkbox" class="form-check-input" id="dropdownCheck" />
        <label class="form-check-label" for="dropdownCheck">
          Remember me
        </label>
      </div>-->
      <div class="frorm-group col-sm-12 col-md-4 offset-md-4 mt-4">
        <button type="submit" class="btn btn-primary col-12">Sign in</button>
      </div>
    </form>
    <!-- <a href="#">New around here? Sign up</a><br />
    <a href="#">Forgot password?</a>-->
  </div>
</template>

<script>
import * as auth from '../../services/auth.service';

export default {
  name: 'login',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      loginError: false
    };
  },
  methods: {
    submitLogin: async function(event) {
      this.loginError = false;
      const user = {
        email: this.email,
        password: this.password
      };
      await auth
        .login(user)
        .then(res => {
          this.$router.push({ name: 'home' });
        })
        .catch(error => {
          console.log(error);
          this.loginError = true;
        });
    }
  }
};
</script>