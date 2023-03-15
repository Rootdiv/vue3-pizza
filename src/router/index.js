import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import Cart from '@/pages/Cart.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
