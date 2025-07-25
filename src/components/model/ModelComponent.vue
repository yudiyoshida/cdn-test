<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import IconButtonComponent from '@/components/button/IconButtonComponent.vue';
import TextButtonComponent from '@/components/button/TextButtonComponent.vue';
import ImageComponent from '@/components/image/ImageComponent.vue';
import ImageCropperComponent from '../image/ImageCropperComponent.vue';
import ImageSelectorComponent from '../image/ImageSelectorComponent.vue';

const emit = defineEmits<{
  (e: 'modelChanged', image: string): void;
}>();

const models = [
  'https://dr3ssup.s3.us-east-2.amazonaws.com/models/male_1.png',
  'https://dr3ssup.s3.us-east-2.amazonaws.com/models/male_2.png',
  'https://dr3ssup.s3.us-east-2.amazonaws.com/models/male_3.png',
  'https://dr3ssup.s3.us-east-2.amazonaws.com/models/female_1.png',
  'https://dr3ssup.s3.us-east-2.amazonaws.com/models/female_2.png',
  'https://dr3ssup.s3.us-east-2.amazonaws.com/models/female_3.png',
];
const currentModel = ref(models[0]);

const isCropping = ref(false);
const imageSelected = ref<string | null>(null);
const imageSelectorRef = useTemplateRef('imageSelectorRef');

onMounted(() => {
  const modelIndex = Math.floor(Math.random() * models.length);
  currentModel.value = models[modelIndex];
});

function selectPreviousModel() {
  const currentIndex = models.indexOf(currentModel.value);
  const previousIndex = (currentIndex - 1 + models.length) % models.length;
  currentModel.value = models[previousIndex];
}

function selectNextModel() {
  const currentIndex = models.indexOf(currentModel.value);
  const nextIndex = (currentIndex + 1) % models.length;
  currentModel.value = models[nextIndex];
}

function changeModel() {
  emit('modelChanged', currentModel.value);
}

function onImageSelected(image: string) {
  imageSelected.value = image;
  isCropping.value = true;
}

function onImageCropped(image: string) {
  currentModel.value = image;
  isCropping.value = false;
}
</script>

<template>
  <div class="flex items-center justify-center h-screen relative">
    <template v-if="!isCropping">
      <ImageComponent :image="currentModel" />  
      <IconButtonComponent :icon="ChevronLeft" class="circular-button absolute left-4" @click="selectPreviousModel" />
      <IconButtonComponent :icon="ChevronRight" class="circular-button absolute right-4" @click="selectNextModel" />
      <div class="bottom-action">
        <TextButtonComponent text="Selecionar" class="w-full" @click="changeModel" />
        <IconButtonComponent :icon="Camera" class="circular-button" @click="imageSelectorRef?.selectImage()" />
      </div>
    </template>

    <template v-else>
      <ImageCropperComponent :image="imageSelected!" @cancel="isCropping = false" @image-cropped="onImageCropped" />
    </template>
  </div>

  <ImageSelectorComponent
    ref="imageSelectorRef"
    class="hidden"
    @image-selected="onImageSelected"
  />
</template>

<style scoped>
.circular-button {
  background-color: var(--color-primary);
  color: #fff;
  padding: 0.5rem;
}
</style>