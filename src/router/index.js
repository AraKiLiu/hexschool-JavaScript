import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 前台
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
      },
      // {
      //   path: '/product/:id',
      //   name: 'Product',
      //   component: () => import('../views/Product.vue'),
      // },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue'),
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
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
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
