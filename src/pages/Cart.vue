<template>
  <div class="container container--cart">
    <div class="cart">
      <CartItem v-if="count" />
      <CartEmpty v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  import CartEmpty from '@/components/CartEmpty.vue';
  import CartItem from '@/components/CartItem.vue';
  import { computed } from 'vue';
  import { useStore } from '@/store';

  const count = computed<number>(() => useStore().getters['cart/cartTotalCount']);
</script>
