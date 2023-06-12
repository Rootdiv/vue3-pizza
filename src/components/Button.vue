<template>
  <button type="button" class="button button--outline" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  defineEmits(['click']);
</script>
