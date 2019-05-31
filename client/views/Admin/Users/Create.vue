<template>
  <div class="trivia-create container">
    <form v-if="!created" class="px-4 py-3 row mt-5" v-on:submit.prevent="create">
      <h2 class="col-sm-12 col-md-8 offset-md-2 col-xl-4 offset-xl-4 mb-5">Add User</h2>
      <div class="form-group col-sm-12 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
        <label for="first_name">First Name</label>
        <input
          v-model="first_name"
          type="text"
          class="form-control"
          id="first_name"
          name="first_name"
          placeholder="John"
        >
      </div>
      <div class="form-group col-sm-12 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
        <label for="last_name">Last Name</label>
        <input
          v-model="last_name"
          type="text"
          class="form-control"
          id="last_name"
          name="last_name"
          placeholder="Smith"
        >
      </div>
      <div class="form-group col-sm-12 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="email"
          name="email"
          placeholder="john@johndoe.com"
        >
      </div>
      <div class="form-group col-sm-12 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="text"
          class="form-control"
          id="password"
          name="password"
          placeholder="******"
        >
      </div>
      <div class="form-group col-sm-12 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
        <label for="role">Role: &nbsp;</label>
        <select v-model="role" id="role" name="role" class="form-control">
          <option value="admin">Admin</option>
          <option value="user" selected>User</option>
        </select>
      </div>
      <div class="frorm-group col-sm-12 col-md-8 offset-md-2 col-xl-4 offset-xl-4 mt-4">
        <button type="submit" class="btn btn-primary col-12">Add User</button>
      </div>
    </form>
    <div v-else>
      <h2>User has been sucessfully created</h2>
      <div>{{ id }}</div>
      <div>Name: {{ full_name }}</div>
      <div>Email: {{ email }}</div>
      <div>Password: ****</div>
      <div>Role: {{ role }}</div>
    </div>
  </div>
</template>

<script>
import * as auth from '../../../services/auth.service';
import * as user from '../../../services/user.service';

export default {
  name: 'user-create',
  components: {},
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'user',
      created: false
    };
  },
  methods: {
    create: function(event) {
      console.log('creating user');
      user
        .createUser({
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          role: this.role
        })
        .then(res => {
          const user = res.data.user;
          this.id = user._id;
          this.first_name = user.first_name;
          this.last_name = user.last_name;
          this.full_name = `${user.first_name} ${user.last_name}`;
          this.role = user.role;
          this.created = true;
        });
    }
  }
};
</script>