<script setup lang="ts">
import DrawerClose from './components/DrawerClose.vue';
import DrawerContent from './components/DrawerContent.vue';
import DrawerFooter from './components/DrawerFooter.vue';
import DrawerRoot from './components/DrawerRoot.vue';
import DrawerTrigger from './components/DrawerTrigger.vue';
</script>

<template>
  <DrawerRoot>
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent class="p-4 pt-0 bg-white">
      <slot />
      <DrawerFooter class="p-0 pt-4">
        <DrawerClose class="grid grid-cols-2 gap-4">
          <slot name="action" />
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </DrawerRoot>
</template>
