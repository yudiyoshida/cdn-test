<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import IconButtonComponent from '@/components/button/IconButtonComponent.vue';

const { scrollPrev } = useCarousel();
</script>

<template>
  <IconButtonComponent
    data-slot="carousel-previous"
    :icon="ArrowLeft"
    @click="scrollPrev"
    class="absolute top-1/2 left-1 -translate-y-1/2"
  />
</template>
