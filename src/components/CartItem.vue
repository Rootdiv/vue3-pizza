<template>
  <div class="cart__item">
    <div class="cart__item-img">
      <img class="pizza-block__image" :src="cartPizza.imageUrl" alt="Pizza" />
    </div>
    <div class="cart__item-info">
      <h3>{{ cartPizza.title }}</h3>
      <p>{{ cartPizza.dough }}, {{ cartPizza.size }} см.</p>
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
      <button class="button button--outline button--circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor">
          <path d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z" />
          <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useStore } from '@/store';
  import { CartItemType } from '@/store/cart/types';

  export default defineComponent({
    name: 'CartItem',

    props: {
      cartPizza: {
        type: Object as PropType<CartItemType>,
        required: true,
      },
    },

    setup() {
      const store = useStore();

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

      return {
        plusItem,
        minusItem,
        removeItem,
      };
    },
  });
</script>
