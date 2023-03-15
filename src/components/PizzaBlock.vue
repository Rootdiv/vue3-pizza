<template>
  <div class="pizza-block-wrapper">
    <div class="pizza-block">
      <img class="pizza-block__image" :src="pizza.imageUrl" alt="Pizza" />
      <h4 class="pizza-block__title">{{ pizza.title }}</h4>
      <div class="pizza-block__selector">
        <ul>
          <li v-for="(dough, index) in typesDough"
            v-bind:class="{ active: index === selectedDough, disabled: !pizza.types.includes(index) }"
            v-on:click="selectedDough = index" v-text="dough" />
        </ul>
        <ul>
          <li v-for="diameter in availableSizes"
            :class="{ active: diameter === selectedDiameter, disabled: !pizza.sizes.includes(diameter) }"
            @click="selectedDiameter = diameter" v-text="`${diameter} см.`" />
        </ul>
      </div>
      <div class="pizza-block__bottom">
        <div class="pizza-block__price">от {{ pizza.price }} &#8381;</div>
        <button type="button" class="button button--outline button--add" @click="addToCart()">
          <svg width="10" height="10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.92 3.84v4.8a.96.96 0 0 1-1.92 0V.96a.96.96 0 0 1 1.92 0v2.88Z" />
            <path d="M5.76 5.92H.96A.96.96 0 0 1 .96 4h7.68a.96.96 0 0 1 0 1.92H5.76Z" />
          </svg>
          <span>Добавить</span>
          <span v-show="count" class="count">{{ count }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'PizzaBlock',
    props: {
      pizza: Object,
      required: true,
    },
    setup({ pizza }) {
      const typesDough = ['тонкое', 'традиционное'];
      const availableSizes = [26, 30, 40];

      const selectedDiameter = ref(pizza.sizes[0]);
      const selectedDough = ref(pizza.types[0]);

      const store = useStore();

      const addToCart = () => {
        store.dispatch('cart/addToCart', {
          id: pizza.id,
          imageUrl: pizza.imageUrl,
          title: pizza.title,
          dough: typesDough[selectedDough.value],
          diameter: selectedDiameter.value,
          price: pizza.price,
        });
      };
      //Передаём ID для вычисления количества заказанной пиццы
      const count = computed(() => store.getters['cart/cartItemsCount'](pizza.id));

      return {
        typesDough,
        availableSizes,
        selectedDiameter,
        selectedDough,
        addToCart,
        count,
      };
    },
  };
</script>