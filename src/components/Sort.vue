<template>
  <div class="sort" ref="sortRef">
    <div class="sort__label">
      <img :class="['sort__arrow', { rotated: isOpen }]" src="@/assets/img/arrow-top.svg" alt="" />
      <b>Сортировка по:</b>
      <span @click="toggleOpen()">{{ selectedSortActive }}</span>
    </div>
    <div class="sort__popup" v-show="isOpen">
      <ul>
        <li v-for="sortList in sortLists" :key="sortList.type" :class="{ active: sortList.title === selectedSortActive }"
          @click="selectedSort(sortList)" v-text="sortList.title" />
      </ul>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'Sort',

    setup() {
      const store = useStore();
      const sortLists = [
        { title: 'популярности (DESC) ↓', type: 'rating', order: 'desc' },
        { title: 'популярности (ASC) ↑', type: '-rating', order: 'asc' },
        { title: 'цене (DESC) ↓', type: 'price', order: 'desc' },
        { title: 'цене (ASC) ↑', type: '-price', order: 'asc' },
        { title: 'алфавиту (DESC) ↓', type: 'title', order: 'desc' },
        { title: 'алфавиту (ASC) ↑', type: '-title', order: 'asc' },
      ];
      const sortTitle = store.state.filter.sorts.title;

      const isOpen = ref(false);
      const sortRef = ref(null);
      const selectedSortActive = ref(sortTitle);

      const selectedSort = (sortsData) => {
        selectedSortActive.value = sortsData.title;
        store.commit('filter/setSorts', sortsData);
        store.dispatch('pizzas/fetchPizzas');
        isOpen.value = false;
      };

      const toggleOpen = () => {
        isOpen.value = !isOpen.value;
      };

      const handleOutsideClick = (event) => {
        if (!event.composedPath().includes(sortRef.value)) {
          isOpen.value = false;
        }
      };

      onMounted(() => {
        document.body.addEventListener('click', handleOutsideClick);
      });

      onBeforeUnmount(() => {
        document.body.removeEventListener('click', handleOutsideClick);
      });

      return {
        sortLists,
        sortTitle,
        selectedSort,
        selectedSortActive,
        isOpen,
        toggleOpen,
        sortRef,
      };
    },
  };
</script>
