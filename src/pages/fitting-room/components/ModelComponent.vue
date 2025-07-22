<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import IconButtonComponent from '@/components/button/IconButtonComponent.vue';
import TextButtonComponent from '@/components/button/TextButtonComponent.vue';
import ImageSelectorComponent from '../../../components/image-selector/ImageSelectorComponent.vue';

defineProps<{
  isChangingModel: boolean;
}>();

const emit = defineEmits<{
  (e: 'modelChanged', image: string): void;
}>();

const models = [
  'src/assets/images/male_1.png',
  'src/assets/images/male_2.png',
  'src/assets/images/male_3.png',
];

const currentModel = ref(models[0]);
const imageSelectorRef = useTemplateRef('imageSelectorRef');

onMounted(() => {
  const modelIndex = Math.floor(Math.random() * models.length);
  currentModel.value = models[modelIndex];
})

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

function onUserImageSelected(file: File) {
  if (!isValidImage(file)) {
    console.error('Invalid image file selected');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const imageUrl = event.target?.result;
    if (imageUrl) {
      currentModel.value = imageUrl as string;
    }
  };
  reader.readAsDataURL(file);
}

function isValidImage(file: File): boolean {
  return file.type.startsWith('image/');
}

function changeModel() {
  emit('modelChanged', currentModel.value);
}
</script>

<template>
  <div class="flex items-center justify-center h-screen relative">
    <img
      :src="currentModel"
      alt="imagem do modelo"
      class="h-screen object-cover mx-auto"
    />

    <div v-if="isChangingModel && !imageSelectorRef?.file">
      <IconButtonComponent
        :icon="ChevronLeft"
        class="circular-button absolute left-4"
        @click="selectPreviousModel"
      />
      <IconButtonComponent
        :icon="ChevronRight"
        class="circular-button absolute right-4"
        @click="selectNextModel"
      />
    </div>

    <div v-if="isChangingModel" class="bottom-action">
      <TextButtonComponent
        text="Selecionar"
        class="w-full"
        @click="changeModel"
      />
      <IconButtonComponent
        :icon="Camera"
        class="circular-button"
        @click="imageSelectorRef?.selectImage()"
      />
    </div>
  </div>
  <ImageSelectorComponent
    @image-selected="onUserImageSelected"
    class="hidden"
    ref="imageSelectorRef"
  />
</template>

<style scoped>
.circular-button {
  background-color: var(--color-primary);
  color: #fff;
  padding: 0.5rem;
}
</style>