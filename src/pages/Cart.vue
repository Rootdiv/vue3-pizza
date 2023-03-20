<template>
  <CartEmpty v-if="!countTotal" />
  <div v-else class="container container--cart">
    <div class="cart">
      <div class="cart__top">
        <h2 class="content__title">
          <CartSvg /> Корзина
        </h2>
        <div class="cart__clear" @click="clearCart()">
          <TrashSvg /> <span>Очистить корзину</span>
        </div>
      </div>
      <div class="content__items">
        <TransitionGroup name="cart-item">
          <CartItem v-for="cartPizza in cartPizzas" :key="cartPizza.id" :cartPizza="cartPizza" @minus="minusItem"
            @plus="plusItem" @remove="removeItem" />
        </TransitionGroup>
      </div>
      <div class="cart__bottom">
        <div class="cart__bottom-details">
          <span>
            Всего пицц: <b>{{ countTotal }} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{{ priceTotal }} &#8381;</b>
          </span>
        </div>
        <div class="cart__bottom-buttons">
          <RouterLink to="/" class="button button--outline button--add go-back-btn">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <span>Вернуться назад</span>
          </RouterLink>
          <div class="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import CartEmpty from '@/components/CartEmpty.vue';
  import CartItem from '@/components/CartItem.vue';
  import CartSvg from '@/components/icons/CartSvg.vue';
  import TrashSvg from '@/components/icons/TrashSvg.vue';

  import { computed, watch } from 'vue';
  import { useStore } from '@/store';
  import { CartItemType } from '@/store/cart/types';

  export default {
    name: 'Cart',
    components: {
      CartEmpty,
      CartItem,
      CartSvg,
      TrashSvg,
    },

    setup() {
      const store = useStore();

      const cartPizzas = computed<CartItemType[]>(() => store.getters['cart/cartPizzas']);
      const countTotal = computed<number>(() => store.getters['cart/cartTotalCount']);
      const priceTotal = computed<number>(() => store.getters['cart/cartTotalPrice']);

      const clearCart = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
          store.dispatch('cart/clearCart');
        }
      };

      const plusItem = (id: number) => {
        store.commit('cart/incrementItemCount', id);
      };

      const minusItem = (id: number) => {
        store.commit('cart/decrementItemCount', id);
      };

      const removeItem = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить товар?')) {
          store.dispatch('cart/removeItem', id);
        }
      };

      watch(priceTotal, () => {
        store.getters['cart/cartTotalPrice'];
        store.getters['cart/cartTotalCount'];
      });

      return {
        cartPizzas,
        countTotal,
        priceTotal,
        plusItem,
        minusItem,
        removeItem,
        clearCart,
      };
    },
    emits: ['vnode-unmounted'],
  };
</script>

<style lang="scss" scoped>
  .cart-item {

    &-enter-active,
    &-leave-active {
      transition: all 0.3s ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
  }
</style>
