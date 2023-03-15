<template>
  <div class="header">
    <div class="container">
      <RouterLink to="/" class="header__logo">
        <img width="38" src="@/assets/img/pizza-logo.svg" alt="Pizza logo" />
        <div>
          <h1>Vue 3 Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </RouterLink>
      <Search v-show="path !== '/cart'" />
      <div class="header__cart">
        <RouterLink to="/cart" class="button button--cart">
          <span>{{ price }} &#8381;</span>
          <div class="button__delimiter"></div>
          <img src="@/assets/img/cart.svg" alt="Корзина" />
          <span>{{ count }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed, watch, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import Search from './Search.vue';

  export default {
    name: 'Header',
    components: { Search },
    setup() {
      const store = useStore();
      const price = computed(() => store.getters['cart/cartTotalPrice']);
      const count = computed(() => store.getters['cart/cartTotalCount']);

      const route = useRoute();
      const path = ref('/');

      watch(route, () => {
        path.value = route.path;
      });

      return { price, count, path };
    },
  };
</script>
