import * as auth from '../services/auth.service';

export default [
  {
    path: '/admin/users/create',
    name: 'user-create',
    component: () => import('../views/Admin/Users/Create.vue'),
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn() && auth.isAdmin()) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/admin/users/manage',
    name: 'user-manage',
    component: () => import('../views/Admin/Users/Manage.vue'),
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn() && auth.isAdmin()) {
        next();
      } else {
        next('/login');
      }
    }
  }
];
