import Vue from 'vue';
import Router from 'vue-router';
import UserPage from './views/UserPage.vue';
import AdminLogin from './views/AdminLogin.vue';
import AdminPage from './views/AdminPage.vue';

Vue.use(Router);

function isAuthed() {
  return !!localStorage.getItem('token');
}

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: UserPage },
    { path: '/admin/login', component: AdminLogin },
    {
      path: '/admin',
      component: AdminPage,
      beforeEnter: (to, from, next) => {
        if (!isAuthed()) return next('/admin/login');
        next();
      }
    },
    { path: '*', redirect: '/' }
  ]
});

export default router;
