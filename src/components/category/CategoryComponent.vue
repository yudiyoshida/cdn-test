<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { findAllCategories } from '@/services/category/category';
import type { CategoryDto } from '@/services/category/category.dto';
import SelectComponent from '@/lib/ui/select/SelectComponent.vue';

const categories = ref<CategoryDto[]>([]);

defineEmits<{
  (e: 'categorySelected', category: string): void;
}>();

onMounted(async () => {
  categories.value = await findAllCategories();
});
</script>

<template>
  <SelectComponent
    :items="categories"
    item-key="id"
    item-label="name"
    @selected="category => $emit('categorySelected', category)"
  />
</template>