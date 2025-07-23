<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const isLoaded = ref(false);

const props = defineProps<{
  image: string;
}>();

onMounted(() => {
  isLoaded.value = false;
});

watch(
  () => props.image,
  () => isLoaded.value = false
);
</script>

<template>
  <div class="relative w-full h-screen mx-auto overflow-hidden">
    <div
      v-if="!isLoaded"
      class="absolute inset-0 bg-zinc-400 animate-pulse flex items-center justify-center text-zinc-600"
    >
      <p>Carregando imagem...</p>
    </div>

    <img
      :src="image"
      :alt="image"
      :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
      class="object-cover w-full h-full transition-opacity duration-500"
      @load="isLoaded = true"
    />
  </div>
</template>