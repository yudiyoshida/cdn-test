<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '@/services/socket/socketio';
import { toast } from 'vue-sonner';
import { Shirt, User2, X } from 'lucide-vue-next';
import type { GetPrediction } from '@/services/socket/events/get-prediction';
import type { RunPrediction } from '@/services/socket/events/run-prediction';
import GarmentComponent from '@/components/garment/GarmentComponent.vue';
import IconButtonComponent from '@/components/button/IconButtonComponent.vue';
import ImageComponent from '@/components/image/ImageComponent.vue';
import LoadingComponent from '@/components/loading/LoadingComponent.vue';
import ModelComponent from '@/components/model/ModelComponent.vue';
import TextButtonComponent from '@/components/button/TextButtonComponent.vue';

const isChangingModel = ref(true);
const isLoading = ref(false);

const modelImage = ref<string | null>(null);
const garmentImage = ref<string | null>(null);
const category = 'auto';
const mode = 'balanced';

onMounted(() => {
  socket.connect();
  socket.on('get-prediction', (data: GetPrediction) => {
    isLoading.value = false;

    if (data.error) {
      toast.error('Erro ao obter a imagem do modelo. Por favor, tente novamente.', {
        closeButton: true,
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

function onGarmentChange(image: string) {
  garmentImage.value = image;
}

function tryOn() {
  isLoading.value = true;
  isChangingModel.value = false;
  
  const data: RunPrediction = {
    modelImage: modelImage.value!,
    garmentImage: garmentImage.value!,
    category,
    mode
  };
  socket.emit('run-prediction', data);
}
</script>

<template>
  <IconButtonComponent class="absolute top-4 right-4 z-50 p-1!" :icon="X" />
  <LoadingComponent v-if="isLoading" />

  <ModelComponent v-if="isChangingModel" @model-changed="onModelChange" />

  <div v-show="!isChangingModel">
    <ImageComponent :image="modelImage!" />
    <div class="bottom-action">
      <div class="space-x-2">
        <IconButtonComponent
          :icon="User2"
          :disabled="isLoading"
          @click="isChangingModel = true"
        />
        <GarmentComponent @garment-selected="onGarmentChange">
          <IconButtonComponent :icon="Shirt" :disabled="isLoading" />
        </GarmentComponent>
      </div>
      <TextButtonComponent
        text="Vestir roupa!"
        :disabled="isLoading || !modelImage || !garmentImage"
        @click="tryOn"
      />
    </div>
  </div>
</template>