<template>
  <div class="sort" ref="sortRef">
    <div class="sort__label">
      <img :class="['sort__arrow', { rotated: isOpen }]" src="@/assets/img/arrow-top.svg" alt="" />
      <b>Сортировка по:</b>
      <span @click="toggleOpen()">{{ selectedSortActive }}</span>
    </div>
    <div class="sort__popup" v-show="isOpen">
      <ul>
        <li
          v-for="sortList in sortLists"
          :key="sortList.type"
          :class="{ active: sortList.title === selectedSortActive }"
          @click="selectedSort(sortList)"
          v-text="sortList.title" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { SortItem, SortTypeEnum } from '@/store/filter/types';
  import { useStore } from '@/store';

  export default {
    name: 'Sort',

    setup() {
      const store = useStore();
      const sortLists: SortItem[] = [
        { title: 'популярности (DESC) ↓', type: SortTypeEnum.RATING_DESC, order: 'desc' },
        { title: 'популярности (ASC) ↑', type: SortTypeEnum.RATING_ASC, order: 'asc' },
        { title: 'цене (DESC) ↓', type: SortTypeEnum.PRICE_DESC, order: 'desc' },
        { title: 'цене (ASC) ↑', type: SortTypeEnum.PRICE_ASC, order: 'asc' },
        { title: 'алфавиту (DESC) ↓', type: SortTypeEnum.TITLE_DESC, order: 'desc' },
        { title: 'алфавиту (ASC) ↑', type: SortTypeEnum.TITLE_ASC, order: 'asc' },
      ];
      const sortTitle = store.state.filter.sorts.title;

      const isOpen = ref(false);
      const sortRef = ref<HTMLDivElement>();
      const selectedSortActive = ref(sortTitle);

      const selectedSort = (sortsData: SortItem) => {
        selectedSortActive.value = sortsData.title;
        store.commit('filter/setSorts', sortsData);
        store.dispatch('pizzas/fetchPizzas');
        isOpen.value = false;
      };

      const toggleOpen = () => {
        isOpen.value = !isOpen.value;
      };

      const handleOutsideClick = (event: MouseEvent) => {
        if (sortRef instanceof HTMLDivElement) {
          if (!event.composedPath().includes(sortRef)) {
            isOpen.value = false;
          }
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
