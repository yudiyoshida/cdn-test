<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '@/services/socket/socketio';
import { Shirt, User2 } from 'lucide-vue-next';
import { useSnackbar } from 'vue3-snackbar';
import IconButtonComponent from '@/components/button/IconButtonComponent.vue';
import ImageComponent from '@/components/image/ImageComponent.vue';
import LoadingComponent from '@/components/loading/LoadingComponent.vue';
import ModelComponent from '@/components/model/ModelComponent.vue';
import TextButtonComponent from '@/components/button/TextButtonComponent.vue';
import type { GetPrediction } from '@/services/socket/events/get-prediction';
import type { RunPrediction } from '@/services/socket/events/run-prediction';

const isChangingModel = ref(true);
const isLoading = ref(false);
const snackbar = useSnackbar();

const modelImage = ref<string | null>(null);
const garmentImage = ref<string | null>(null);
const category = 'auto';
const mode = 'performance';

onMounted(() => {
  socket.connect();
  socket.on('get-prediction', (data: GetPrediction) => {
    isLoading.value = false;

    if (data.error) {
      snackbar.add({
        type: 'error',
        text: 'Erro ao obter a imagem do modelo. Por favor, tente novamente.',
      });
      return;
    }
    modelImage.value = data.output![0];
  });
});

onUnmounted(() => {
  socket.removeAllListeners();
  socket.disconnect();
});

function onModelChange(image: string) {
  modelImage.value = image;
  isChangingModel.value = false;
}

function tryOn() {
  isLoading.value = true;
  isChangingModel.value = false;
  
  const data: RunPrediction = {
    modelImage: modelImage.value!,
    garmentImage: 'https://dressup-homolog.s3.us-east-2.amazonaws.com/4cc64cee-6728-48cd-a274-e6feebaff42c-image.png',
    category,
    mode
  };
  socket.emit('run-prediction', data);
}
</script>

<template>
  <LoadingComponent v-if="isLoading" />
  
  <ModelComponent v-if="isChangingModel" @model-changed="onModelChange" />
  <template v-else>
    <ImageComponent :image="modelImage!" />
    <div class="bottom-action">
      <div class="space-x-2">
        <IconButtonComponent :icon="User2" @click="isChangingModel = true" />
        <IconButtonComponent :icon="Shirt" />
      </div>
      <TextButtonComponent text="Vestir roupa!" @click="tryOn" />
    </div>
  </template>
</template>