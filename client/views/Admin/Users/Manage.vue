<template>
  <div class="users-manage container">
    <h2 class="col-sm-12 col-md-4 offset-md-4 mb-5">Users</h2>
    <table v-if="isLoaded" class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td class="text-muted">click to edit</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as auth from '../../../services/auth.service';
import * as user from '../../../services/user.service';

export default {
  name: 'user-manage',
  components: {},
  data() {
    return {
      isLoaded: false,
      users: []
    };
  },
  beforeMount() {
    user.getAllUsers().then(res => {
      this.users = res.data;
      this.isLoaded = true;
    });
  }
};
</script>