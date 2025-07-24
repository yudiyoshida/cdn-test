<script setup lang="ts">
import type { LucideProps } from 'lucide-vue-next';
import type { FunctionalComponent } from 'vue';
import ButtonComponent from './ButtonComponent.vue';

defineProps<{
  disabled?: boolean;
  icon: FunctionalComponent<LucideProps>;
}>();
</script>

<template>
  <ButtonComponent class="bg-primary text-white p-2" :disabled>
    <component :is="icon" />
  </ButtonComponent>
</template>