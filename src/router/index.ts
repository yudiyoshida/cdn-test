import { createRouter, createWebHistory } from 'vue-router';

import FittingRoomPage from '@/pages/fitting-room/FittingRoomPage.vue';
import SplashScreenPage from '@/pages/splash-screen/SplashScreenPage.vue';

export enum Routes {
  SPLASH = 'splash',
  HOME = 'home',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: Routes.SPLASH,
      component: SplashScreenPage,
    },
    {
      path: '/home',
      name: Routes.HOME,
      component: FittingRoomPage,
    },
  ],
});

export default router;
