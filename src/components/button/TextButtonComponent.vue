<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';

defineProps<{
  text: string;
}>();
</script>

<template>
  <ButtonComponent class="bg-primary text-white text-sm px-4 py-2">
    {{ text }}
  </ButtonComponent>
</template>