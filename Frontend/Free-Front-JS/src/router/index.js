import { createRouter, createWebHistory } from 'vue-router';
import AppView from '../App.vue';
import HomeView from '../views/HomeView.vue';
import '../styles/style.css'
const router = createRouter({
  history: createWebHistory('/free-time/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
