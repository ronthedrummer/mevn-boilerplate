import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from './services/AuthService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3000/api',
    isLoggedIn: false,
    isAdmin: false,
    user: {}
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      state.isAdmin = auth.isAdmin();
      if (state.isLoggedIn) {
        state.user = JSON.parse(localStorage.getItem('user'));
      } else {
        state.user = {};
      }
    }
  },
  getters: {
    username: state => {
      return state.user.first_name;
    },
    user: state => {
      return state.user;
    },
    isLoggedIn: state => {
      return state.isLoggedIn;
    },
    isAdmin: state => {
      return state.isAdmin;
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate');
    },
    updateUser(context, user) {
      context.commit('updateUser', user);
    }
  }
});
