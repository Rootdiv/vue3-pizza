<template>
  <button type="button" class="button button--outline" :class="class" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{ class: string }>();
  defineEmits(['click']);
</script>
