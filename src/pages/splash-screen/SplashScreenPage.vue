<script setup lang="ts">
import LogoComponent from '@/components/logo/LogoComponent.vue';
import { Routes } from '@/router';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push({ name: Routes.HOME });
  }, 3000);
});
</script>

<template>
  <section class="h-screen w-full flex items-center justify-center bg-primary">
    <LogoComponent class="w-56" />
  </section>
</template>