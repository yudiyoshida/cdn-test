<script setup lang="ts">
import 'vue-sonner/style.css';

import { ref } from 'vue';
import { X } from 'lucide-vue-next';
import { Toaster } from './lib/ui/sonner';
import FittingRoomPage from './pages/fitting-room/FittingRoomPage.vue';
import IconButtonComponent from './components/button/IconButtonComponent.vue';
import SplashScreenPage from './pages/splash-screen/SplashScreenPage.vue';

const showSplashScreen = ref(true);
</script>

<template>
  <Toaster />
  <div class="relative">
    <template v-if="showSplashScreen">
      <SplashScreenPage @hide="showSplashScreen = false" />
    </template>
    <template v-else>
      <IconButtonComponent class="absolute top-4 right-4 z-50 p-1!" :icon="X" />
      <FittingRoomPage />
    </template>
  </div>
</template>