import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import * as auth from './services/AuthService';
import adminRoutes from './routes/admin.routes.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Account/Login.vue'),
      props: { email: '', loggedOut: false }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        auth.logout();
        next('/login');
      }
    },
    // use the array of routes made in a separate file, keeps this file cleaner (ES6 spread opperator)
    ...adminRoutes
  ]
});
