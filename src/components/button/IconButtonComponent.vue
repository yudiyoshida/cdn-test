<script setup lang="ts">
import type { LucideProps } from 'lucide-vue-next';
import type { FunctionalComponent } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

defineProps<{
  icon: FunctionalComponent<LucideProps>;
}>();
</script>

<template>
  <ButtonComponent>
    <component :is="icon" />
  </ButtonComponent>
</template>