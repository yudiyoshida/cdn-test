<script setup lang="ts">
import type { ProductDto } from '@/services/product/product.dto';
import { Card, CardContent } from '@/lib/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/ui/carousel';
import { onMounted, ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import type { Pagination } from '@/types/pagination';

const productClicked = ref<string | null>(null);

const props = defineProps<{
  productClickedPreviously?: ProductDto | null;
  products: Pagination<ProductDto>;
}>();

onMounted(() => {
  if (props.productClickedPreviously) {
    productClicked.value = props.productClickedPreviously.id;
  }
});

const emit = defineEmits<{
  (e: 'productClicked', product: ProductDto): void;
  (e: 'loadMoreProducts'): void;
}>();

function onProductClick(product: ProductDto) {
  productClicked.value = product.id;
  emit('productClicked', product);
}

function onMoreProducts() {
  if (props.products.currentPage < props.products.totalPages) {
    emit('loadMoreProducts');
  }
}
</script>

<template>
  <Carousel class="relative w-full">
    <CarouselContent>
      <CarouselItem v-for="product in products.data" :key="product.id" class="item">
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
      <CarouselItem class="item" v-if="products.currentPage < products.totalPages">
        <Card class="h-48" @click="onMoreProducts">
          <CardContent class="flex flex-col items-center justify-center h-full bg-zinc-200">
            <component :is="Plus" class="size-10" />
            <span>Exibir mais</span>
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>

    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<style scoped>
.item {
  cursor: pointer;
  flex-basis: calc(2/5 * 100%);
}
.selected {
  border: 3px solid var(--color-primary);
}
</style>