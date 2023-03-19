<template>
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
      <div v-for="cartPizza in cartPizzas" :key="cartPizza.id" class="cart__item">
        <div class="cart__item-img">
          <img class="pizza-block__image" :src="cartPizza.imageUrl" alt="Pizza" />
        </div>
        <div class="cart__item-info">
          <h3>{{ cartPizza.title }}</h3>
          <p>{{ cartPizza.dough }}, {{ cartPizza.diameter }} см.</p>
        </div>
        <div class="cart__item-count">
          <button type="button" class="button button--outline button--circle cart__item-count-minus"
            :disabled="cartPizza.count === 1" @click="minusItem(cartPizza.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor">
              <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
            </svg>
          </button>
          <b>{{ cartPizza.count }}</b>
          <button type="button" class="button button--outline button--circle cart__item-count-plus"
            @click="plusItem(cartPizza.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor">
              <path d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z" />
              <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
            </svg>
          </button>
        </div>
        <div class="cart__item-price">
          <b>{{ cartPizza.price * cartPizza.count }} &#8381;</b>
        </div>
        <div class="cart__item-remove" @click="removeItem(cartPizza.id)">
          <div class="button button--outline button--circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor">
              <path d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z" />
              <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
            </svg>
          </div>
        </div>
      </div>
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
</template>

<script lang="ts">
  import CartSvg from '@/components/icons/CartSvg.vue';
  import TrashSvg from '@/components/icons/TrashSvg.vue';
  import { useStore } from '@/store';
  import { computed } from 'vue';

  export default {
    name: 'CartItem',
    components: {
      CartSvg,
      TrashSvg,
    },

    setup() {
      const store = useStore();

      const cartPizzas = computed(() => store.getters['cart/cartPizzas']);

      const priceTotal = computed(() => store.getters['cart/cartTotalPrice']);
      const countTotal = computed(() => store.getters['cart/cartTotalCount']);

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

      const clearCart = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
          store.dispatch('cart/clearCart');
        }
      };

      return {
        cartPizzas,
        plusItem,
        minusItem,
        removeItem,
        priceTotal,
        countTotal,
        clearCart,
      };
    },
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
