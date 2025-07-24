<script setup lang="ts">
import DrawerComponent from '@/lib/ui/drawer/DrawerComponent.vue';

</script>

<template>
  <DrawerComponent>
    <template #trigger>
      <button>Open Drawer</button>
    </template>
    <div>
      <p>This is the content of the drawer.</p>
      <p>This is the content of the drawer.</p>
      <p>This is the content of the drawer.</p>
      <p>This is the content of the drawer.</p>
      <p>This is the content of the drawer.</p>
    </div>
  </DrawerComponent>
</template>