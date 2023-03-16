<template>
  <div class="container">
    <div class="content__top">
      <Categories />
      <Sort />
    </div>
    <h2 class="content__title">Все пиццы</h2>
    <div v-if="status === 'error'" class="content__error-info">
      <h2> Произошла ошибка <span>&#128533;</span> </h2>
      <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
    </div>
    <div v-else class="content__items">
      <Skeleton v-if="status === 'loading'" v-for="(_, index) in [...new Array(4)]" :key="index" />
      <PizzaBlock v-else v-for="pizza in pizzas" :key="pizza.id" :pizza="pizza" />
    </div>
    <Pagination v-show="totalPages" :totalPages="totalPages" :currentPage="currentPage" :changePage="changePage" />
  </div>
</template>

<script>
  import Categories from '@/components/Categories.vue';
  import Sort from '@/components/Sort.vue';
  import PizzaBlock from '@/components/PizzaBlock.vue';
  import Skeleton from '@/components/Skeleton.vue';
  import Pagination from '@/components/Pagination.vue';
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'Main',
    components: {
      Categories,
      Sort,
      PizzaBlock,
      Skeleton,
      Pagination,
    },
    setup() {
      const store = useStore();

      const status = computed(() => store.state.pizzas.status);
      const pizzas = computed(() => store.state.pizzas.items);
      const currentPage = computed(() => store.state.pizzas.page);
      const totalPages = computed(() => store.state.pizzas.pages);

      const changePage = (page) => {
        store.commit('filter/setCurrentPage', page);
        store.dispatch('pizzas/fetchPizzas');
      };

      // const loading = ref(true);
      // const error = ref(null);

      // const fetchData = async () => {
      //   try {
      //     loading.value = true;
      //     const response = await axios.get('https://rootdiv.ru:2010/pizzas?limit=4');
      //     console.log('response: ', response);
      //     pizzas.value = response.data.pizzas;
      //     console.log('pizzas.value: ', pizzas.value);
      //   } catch (err) {
      //     loading.value = false;
      //     console.error('Произошла ошибка:', err.message);
      //     error.value = err.message;
      //   }
      // };

      onMounted(() => {
        store.dispatch('pizzas/fetchPizzas');
        //fetchData();
      });

      return {
        status,
        pizzas,
        currentPage,
        totalPages,
        changePage,
      };
    },
  };
</script>
