import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/layout/Dashboard.vue'),
    // 前台
    children: [
      {
        path: '/',
        component: () => import('../views/frontend/Index.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: '/products',
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
    component: () => import('../views/backend/layout/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: '產品頁面',
        component: () => import('../views/backend/Products.vue'),
        meta: {
          title: 'Products',
        },
      },
      {
        path: 'coupons',
        name: '優惠券',
        component: () => import('../views/backend/Coupons.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'storages',
        name: '圖片頁面',
        component: () => import('../views/backend/Storages.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/backend/Orders.vue'),
        meta: { requiresAuth: true },
      },
      // Customer
      {
        path: 'customer_order',
        name: '用戶訂單',
        component: () => import('../views/backend/CustomerOrders.vue'),
      },
      {
        path: 'customer_checkout/:orderId',
        name: '用戶訂單列表',
        component: () => import('../views/backend/CustomerCheckout.vue'),
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
