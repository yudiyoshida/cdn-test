<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import { onMounted, ref, useTemplateRef } from 'vue';
import TextButtonComponent from '../button/TextButtonComponent.vue';

const cropperRef = useTemplateRef('cropperRef');

const screenHeight = ref(0);
const screenWidth = ref(0);
const croppedImage = ref<string | null>(null);

defineProps<{
  image: string;
}>();

const emit = defineEmits<{
  (e: 'imageCropped', image: string): void
  (e: 'cancel'): void;
}>();

onMounted(() => {
  screenHeight.value = window.innerHeight * 0.95;
  screenWidth.value = window.innerWidth * 0.95;
});

async function cropImage() {
  const cropper = cropperRef.value;
  if (cropper) {
    const cropperResult = cropper.getResult();
    if (cropperResult && cropperResult.canvas) {
      croppedImage.value = cropperResult.canvas.toDataURL('image/png');
    }
  }
}

function onCancel() {
  emit('cancel');
}

function onSave() {
  emit('imageCropped', croppedImage.value!);
}
</script>

<template>
  <div class="relative h-full w-full flex justify-center items-center">
    <Cropper
      ref="cropperRef"
      class="mx-auto"
      image-restriction="stencil"
      :src="image"
      :style="{
        height: screenHeight + 'px',
        width: screenWidth + 'px'
      }"
      :resizeImage="{
        adjustStencil: false
      }"
      :stencil-props="{
        handlers: {},
        movable: false,
        resizable: false,
      }"
      :stencil-size="{
        height: screenHeight,
        width: screenWidth,
      }"
      @change="cropImage"
    />
    <div class="bottom-action">
      <TextButtonComponent text="Cancelar" @click="onCancel" />
      <TextButtonComponent text="Salvar" @click="onSave" />
    </div>
  </div>
</template>
