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
      <ButtonComponent
        class="button--circle cart__item-count-minus"
        :disabled="cartPizza.count === 1"
        @click="$emit('minus', cartPizza.id)">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor">
          <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
        </svg>
      </ButtonComponent>
      <b>{{ cartPizza.count }}</b>
      <ButtonComponent class="button--circle cart__item-count-plus" @click="$emit('plus', cartPizza.id)">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor">
          <path d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z" />
          <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
        </svg>
      </ButtonComponent>
    </div>
    <div class="cart__item-price">
      <b>{{ cartPizza.price * cartPizza.count }} &#8381;</b>
    </div>
    <div class="cart__item-remove" @click="$emit('remove', cartPizza.id)">
      <ButtonComponent class="button--circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor">
          <path d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z" />
          <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
        </svg>
      </ButtonComponent>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { CartItemType } from '@/store/cart/types';
  import ButtonComponent from './Button.vue';

  export default defineComponent({
    name: 'CartItem',
    components: { ButtonComponent },
    props: {
      cartPizza: {
        type: Object as PropType<CartItemType>,
        required: true,
      },
    },
    emits: ['plus', 'minus', 'remove'],
  });
</script>
