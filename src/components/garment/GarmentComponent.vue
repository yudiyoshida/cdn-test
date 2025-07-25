<script setup lang="ts">
import DrawerComponent from '@/lib/ui/drawer/DrawerComponent.vue';
import ProductCarouselComponent from '../carousel/ProductCarouselComponent.vue';
import TextButtonComponent from '../button/TextButtonComponent.vue';
import { onMounted, ref } from 'vue';
import { findAllProducts } from '@/services/product/product';
import type { ProductDto } from '@/services/product/product.dto';
import type { Pagination } from '@/types/pagination';

const products = ref<Pagination<ProductDto>>({
  currentPage: 1,
  itemsPerPage: 15,
  totalItems: 0,
  totalPages: 0,
  data: [],
});
const selectedProduct = ref<ProductDto | null>(null);

const emit = defineEmits<{
  (e: 'garmentSelected', image: string): void;
}>();

onMounted(async() => {
  products.value = await findAllProducts({
    page: products.value.currentPage,
    size: products.value.itemsPerPage,
  });
});

function onProductClicked(product: ProductDto) {
  selectedProduct.value = product;
};

function onSelect() {
  if (selectedProduct.value) {
    emit('garmentSelected', selectedProduct.value.images[0].imageUrl);
    moveSelectedProductToBegin();
  }
}

function moveSelectedProductToBegin() {
  if (selectedProduct.value) {
    products.value.data = products.value.data.sort((a, b) => {
      if (a.id === selectedProduct.value!.id) return -1;
      if (b.id === selectedProduct.value!.id) return 1;
      return 0;
    });
  }
}

async function onLoadMoreProducts() {
  const result = await findAllProducts({
    page: ++products.value.currentPage,
    size: products.value.itemsPerPage,
  });

  products.value = {
    ...result,
    data: products.value.data.concat(result.data),
  };
}
</script>

<template>
  <DrawerComponent>
    <ProductCarouselComponent
      :products
      :product-clicked-previously="selectedProduct"
      @product-clicked="onProductClicked"
      @load-more-products="onLoadMoreProducts"
    />

    <template #trigger>
      <slot />
    </template>
    <template #action>
      <div class="grid">
        <TextButtonComponent text="Selecionar" @click="onSelect" :disabled="!selectedProduct" />
      </div>
    </template>
  </DrawerComponent>
</template>