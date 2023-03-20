<template>
  <div class="root">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <circle cx="14" cy="14" r="9" fill="none" stroke="#000" />
      <path fill="none" stroke="#000" d="m27 27-6.634-6.634" />
    </svg>
    <input class="input" v-model.trim="searchValue" placeholder="Поиск пиццы..." />
    <button v-show="searchValue" class="clear-icon" @click="searchValue = ''">
      <ClearSvg width="20" height="20" />
    </button>
  </div>
</template>

<script lang="ts">
  import ClearSvg from './icons/ClearSvg.vue';
  import { ref, watch } from 'vue';
  import { useStore } from '@/store';
  import debounce from 'lodash.debounce';

  export default {
    name: 'Search',
    components: { ClearSvg },
    setup() {
      const searchValue = ref('');
      const store = useStore();

      const debounceFetchPizzas = () => {
        debounce(() => {
          store.dispatch('pizzas/fetchPizzas');
        }, 500)();
      };

      watch(searchValue, () => {
        store.commit('filter/setSearchValue', searchValue);
        debounceFetchPizzas();
      });

      return {
        searchValue,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .root {
    position: relative;
    max-width: 500px;
    width: 100%;
    margin-left: -50px;
  }

  .input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 12px 20px;
    padding-left: 42px;
    border-radius: 10px;
    font-size: 16px;
    width: 100%;

    &:focus {
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .search-icon {
    width: 22px;
    height: 22px;
    opacity: 0.3;
    position: absolute;
    left: 14px;
    top: 13px;
  }

  .clear-icon {
    width: 25px;
    height: 25px;
    opacity: 0.3;
    position: absolute;
    right: 12px;
    top: 12px;
    line-height: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
