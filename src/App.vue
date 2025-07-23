<script setup lang="ts">
import { ref } from 'vue';
import { CircleX } from 'lucide-vue-next';
import FittingRoomPage from './pages/fitting-room/FittingRoomPage.vue';
import IconButtonComponent from './components/button/IconButtonComponent.vue';
import SplashScreenPage from './pages/splash-screen/SplashScreenPage.vue';
import { Vue3Snackbar } from 'vue3-snackbar';

const showSplashScreen = ref(true);
</script>

<template>
  <div class="relative">
    <template v-if="showSplashScreen">
      <SplashScreenPage @hide="showSplashScreen = false" />
    </template>
    <template v-else>
      <IconButtonComponent class="absolute top-4 right-4 z-50" :icon="CircleX" />
      <FittingRoomPage />
    </template>
  </div>
  <Vue3Snackbar top right :duration="4000" />
</template>