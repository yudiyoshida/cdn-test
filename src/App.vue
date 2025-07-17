<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
const toggleModal = () => {
  open.value = !open.value;
};
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <button @click="toggleModal" class="bg-black text-white px-4 py-2 rounded">
      Provar com IA
    </button>

    <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Provador Virtual</h2>
        <input type="file" accept="image/*" />
        <button class="mt-4 text-red-500" @click="toggleModal">Fechar</button>
      </div>
    </div>
  </div>
</template>
