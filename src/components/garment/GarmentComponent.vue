<script setup lang="ts">
import DrawerComponent from '@/lib/ui/drawer/DrawerComponent.vue';
import ProductCarouselComponent from '../carousel/ProductCarouselComponent.vue';
import TextButtonComponent from '../button/TextButtonComponent.vue';
import { onMounted, ref } from 'vue';
import { findAllProducts } from '@/services/product/product';
import type { ProductDto } from '@/services/product/product.dto';

const products = ref<ProductDto[]>([]);
const selectedProduct = ref<ProductDto | null>(null);

const emit = defineEmits<{
  (e: 'garmentSelected', image: string): void;
}>();

onMounted(async() => {
  products.value = await findAllProducts();
});

function onProductClicked(product: ProductDto) {
  selectedProduct.value = product;
};

function onClose() {
  selectedProduct.value = null;
}

function onSelect() {
  if (selectedProduct.value) {
    emit('garmentSelected', selectedProduct.value.images[0].imageUrl);
    onClose();
  }
}
</script>

<template>
  <DrawerComponent>
    <ProductCarouselComponent :products @product-clicked="onProductClicked" />

    <template #trigger>
      <slot />
    </template>
    <template #action>
      <TextButtonComponent text="Cancelar" @click="onClose" />
      <TextButtonComponent text="Selecionar" @click="onSelect" :disabled="!selectedProduct" />
    </template>
  </DrawerComponent>
</template>