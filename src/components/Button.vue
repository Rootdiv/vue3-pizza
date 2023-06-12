<template>
  <button type="button" class="button button--outline" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ButtonComponent',
  });
</script>

<script setup lang="ts">
  defineEmits(['click']);
</script>
