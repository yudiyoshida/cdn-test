<script setup lang="ts">
import 'vue-sonner/style.css';
import { RouterView } from 'vue-router';
import { Toaster } from './lib/ui/sonner';
</script>

<template>
  <div class="relative max-w-sm h-screen rounded-md border overflow-hidden">
    <Toaster />
    <RouterView />
  </div>
</template>