import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/layout/Home.vue'),
    // 前台
    children: [
      {
        path: '/',
        component: () => import('../views/frontend/Products.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: 'login',
        component: () => import('../views/frontend/Login.vue'),
        meta: {
          title: 'Login',
        },
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
        meta: {
          title: 'Coupons',
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
