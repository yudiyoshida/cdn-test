<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';

defineProps<{
  items: any[];
  itemKey: string;
  itemLabel: string;
}>();

const emit = defineEmits<{
  (e: 'selected', value: string): void;
}>();

function handleSelect(value: string) {
  emit('selected', value);
}
</script>

<template>
  <Select>
    <SelectTrigger class="w-full mb-4">
      <SelectValue placeholder="Filtrar por categoria" />
    </SelectTrigger>
    <SelectContent class="bg-white">
      <SelectItem
        v-for="item in items"
        :key="item[itemKey]"
        :value="item[itemKey]"
        @select="handleSelect(item[itemKey])"
      >
        {{ item[itemLabel] }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>