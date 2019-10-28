<template>
  <div id="app">
    <ul id="nav" class="nav nav-fill">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">About</router-link>
      </li>
      <li class="nav-item dropdown" v-if="isLoggedIn">
        <a
          href="#"
          class="nav-link dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Admin</a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <router-link :to="{ name: 'user-manage' }" class="dropdown-item">Manage Users</router-link>
          <router-link :to="{ name: 'user-create' }" class="dropdown-item">Add User</router-link>
        </div>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <a @click.prevent="logout" class="nav-link" href="#">
          <span>{{ this.$store.getters.username }}</span> - Logout
        </a>
      </li>
      <li class="nav-item" v-if="!isLoggedIn">
        <router-link to="/login" class="nav-link">Login</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import * as auth from './services/auth.service'
import { http } from './services/http.service'

export default {
  name: 'App',
  methods: {
    logout() {
      auth.logout()
      this.$router.push({
        name: 'login'
      })
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    },
    user() {
      return this.$store.getters.user
    }
  },
  beforeCreate() {
    this.$store.dispatch('authenticate')
  }
}
</script>

<style lang="scss">
@import '$styles/app.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
  label {
    margin-bottom: 0.25rem;
  }
  label,
  input,
  select {
    width: 100%;
    text-align: left;
  }
  &.required {
    label::after {
      content: '(required)';
      margin-left: 0.5rem;
      color: grey;
      font-size: 0.8em;
    }
  }
}
.table {
  th,
  td {
    text-align: left;
  }
}
</style>
