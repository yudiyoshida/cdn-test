<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import IconButtonComponent from '@/components/button/IconButtonComponent.vue';

const { scrollNext } = useCarousel();
</script>

<template>
  <IconButtonComponent
    data-slot="carousel-next"
    :icon="ArrowRight"
    @click="scrollNext"
    class="absolute top-1/2 right-1 -translate-y-1/2"
  />
</template>
