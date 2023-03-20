<template>
  <button type="button" class="button button--outline" :class="class">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{ class: string }>();
  defineEmits(['click']);
</script>
