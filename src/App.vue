<script setup lang="ts">
defineProps<{
  imageUrl?: string
  productName?: string
}>()

function close() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).MyWidget.close()
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-xl p-6 w-[300px]">
    <h2 class="text-lg font-bold mb-2">Provador Virtual</h2>
    <img v-if="imageUrl" :src="imageUrl" class="w-full rounded" />
    <p class="mt-2 text-sm text-gray-700">Produto: {{ productName }}</p>

    <button
      class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      @click="close"
    >
      Fechar
    </button>
  </div>
</template>
