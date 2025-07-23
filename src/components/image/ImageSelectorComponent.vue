<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const fileInput = useTemplateRef('fileInput');
const file = ref<File | null>(null);

defineExpose({
  selectImage,
  file
});

const emit = defineEmits<{
  (e: 'imageSelected', file: File): void;
}>();

function selectImage() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
    emit('imageSelected', file.value);
  }
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