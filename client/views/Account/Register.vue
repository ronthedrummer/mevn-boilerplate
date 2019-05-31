<template>
  <div class="login-form container">
    <form class="px-4 py-3 row mt-5" v-on:submit.prevent="submitLogin">
      <h2 class="col-sm-12 col-md-4 offset-md-4 mb-5">Login</h2>
      <div class="form-group col-sm-12 col-md-4 offset-md-4">
        <label for="email">Email address</label>
        <input
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
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password"
        >
      </div>
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
  name: 'register',
  components: {},
  methods: {
    submitLogin: function(event) {
      console.log('logging in');
      auth.login();
      this.$router.push({ name: 'home' });
    }
  }
};
</script>