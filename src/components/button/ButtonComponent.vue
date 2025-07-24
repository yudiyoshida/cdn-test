<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button
    type="button"
    :disabled
    class="
      cursor-pointer rounded-full transition-opacity duration-300
      opacity-85 hover:opacity-100
      disabled:cursor-not-allowed disabled:bg-zinc-500
    "
  >
    <slot />
  </button>
</template>