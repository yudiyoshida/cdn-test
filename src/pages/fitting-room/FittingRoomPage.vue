<script setup lang="ts">
import { ref } from 'vue';
import ModelComponent from './components/ModelComponent.vue';
import TextButtonComponent from '@/components/button/TextButtonComponent.vue';

const isChangingModel = ref(true);
const modelImage = ref<string | null>(null);

function onModelChange(image: string) {
  isChangingModel.value = false;
  modelImage.value = image;
}

function tryOn() {
  // Logic to try on clothes
  console.log('Trying on clothes');
}
</script>

<template>
  <ModelComponent
    :is-changing-model="isChangingModel"
    @model-changed="onModelChange"
  />
  <div v-if="!isChangingModel" class="bottom-action">
    <TextButtonComponent
      text="Trocar modelo"
      @click="isChangingModel = true"
    />
    <TextButtonComponent
      text="Experimentar roupa"
      @click="tryOn"
    />
  </div>
</template>