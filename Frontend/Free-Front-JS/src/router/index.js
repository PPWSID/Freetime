import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardRoutes from './dashboard.js'
import InvestStakeRoutes from './InvestStake.js'
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    ...DashboardRoutes,
    ...InvestStakeRoutes,
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('../views/NotFound.vue') 
    }
  ]
});

export default router;
