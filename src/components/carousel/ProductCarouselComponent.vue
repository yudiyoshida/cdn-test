<script setup lang="ts">
import type { ProductDto } from '@/services/product/product.dto';
import { Card, CardContent } from '@/lib/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/ui/carousel';
import { onUnmounted, ref } from 'vue';

const productClicked = ref<string | null>(null);

defineProps<{
  products: ProductDto[];
}>();

// TODO: remover
onUnmounted(() => {
  console.log('ProductCarouselComponent unmounted');
});

const emit = defineEmits<{
  (e: 'productClicked', product: ProductDto): void;
}>();

function onProductClick(product: ProductDto) {
  productClicked.value = product.id;
  emit('productClicked', product);
}
</script>

<template>
  <Carousel class="relative w-full">
    <CarouselContent>
      <CarouselItem v-for="product in products" :key="product.id" class="basis-2/5">
        <Card
          @click="onProductClick(product)"
          class="h-48"
          :class="{ selected: productClicked === product.id }"
        >
          <CardContent class="flex items-center justify-center h-full bg-zinc-200">
            <img
              :src="product.images[0].imageUrl"
              alt="imagem produto"
              class="object-cover w-full"
            >
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>

    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<style scoped>
.selected {
  border: 3px solid var(--color-primary);
}
</style>