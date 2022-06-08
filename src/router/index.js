import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import CartPage from '../pages/CartPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import OrderPage from '../pages/OrderPage.vue';
import OrderInfoPage from '../pages/OrderInfoPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '/order', name: 'order', component: OrderPage },
  { path: '/order/:id', name: 'orderInfo', component: OrderInfoPage },
  { path: '/notFound(.*)*', name: 'notfound', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
