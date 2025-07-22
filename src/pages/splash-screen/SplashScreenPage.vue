<script setup lang="ts">
import { onMounted } from 'vue';

const emit = defineEmits<{
  (e: 'hide'): void;
}>();

onMounted(() => {
  setTimeout(() => emit('hide'), 3000);
});
</script>

<template>
  <section class="h-screen w-full flex items-center justify-center bg-primary">
    <img src="@/assets/images/logo.webp" alt="logo" class="w-56">
  </section>
</template>