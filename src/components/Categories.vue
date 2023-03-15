<template>
  <div class="categories">
    <ul>
      <li v-for="(category, index) in categories" :key="category" :class="{ active: category === selectedCategory }"
        @click="changeCategory(index)" v-text="category" />
    </ul>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'Categories',

    setup() {
      const store = useStore();
      const id = store.state.filter.categoryId;
      const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
      const selectedCategory = ref(categories[id]);

      const changeCategory = (index) => {
        selectedCategory.value = categories[index];
        store.commit('filter/setCategoryId', index);
        store.commit('filter/setCurrentPage', 1);
        store.dispatch('pizzas/fetchPizzas');
      };

      return {
        categories,
        selectedCategory,
        changeCategory,
      };
    },
  };
</script>
