<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const fileInput = useTemplateRef('fileInput');
const file = ref<File | null>(null);

defineExpose({
  selectImage,
});

const emit = defineEmits<{
  (e: 'imageSelected', image: string): void;
}>();

function selectImage() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

async function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];

    if (!isValidImage(file.value)) {
      console.error('Invalid image file selected');
      return;
    }
    const base64 = await convertToBase64(file.value);
    emit('imageSelected', base64);
  }
}

function isValidImage(file: File): boolean {
  return file.type.startsWith('image/');
}

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
</script>

<template>
  <input
    ref="fileInput"
    type="file"
    accept="image/*"
    class="hidden"
    :multiple="false"
    @change="onFileChange"
    @click="fileInput?.value ? fileInput!.value = '' : null"
  />
</template>