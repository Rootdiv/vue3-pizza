<template>
  <div class="container container--cart">
    <div class="cart">
      <CartItem v-if="count" />
      <CartEmpty v-else />
    </div>
  </div>
</template>

<script>
  import CartEmpty from '@/components/CartEmpty.vue';
  import CartItem from '@/components/CartItem.vue';
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'Cart',
    components: { CartItem, CartEmpty },
    setup() {
      const count = computed(() => useStore().getters['cart/cartTotalCount']);
      return { count };
    },
  };
</script>
