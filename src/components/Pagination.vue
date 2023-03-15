<template>
  <ul class="pagination">
    <li class="pagination__item" @click="changePage(1)">
      <button type="button" class="pagination__button">&lt;</button>
    </li>
    <li v-for="pageNumber in totalPages" :key="pageNumber" class="pagination__item" @click="changePage(pageNumber)">
      <button type="button" :class="['pagination__button', { selected: currentPage === pageNumber }]"
        v-text="pageNumber" />
    </li>
    <li class="pagination__item" @click="changePage(totalPages)">
      <button type="button" class="pagination__button">&gt;</button>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      totalPages: Number,
      currentPage: Number,
      changePage: Function,
      required: true,
    },
  };
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &__item {
      border-radius: 50%;
      border: 1px solid #fe5f1e;
    }

    &__button {
      background-color: #ffffff;
      width: 45px;
      height: 45px;
      border: none;
      cursor: pointer;
      border-radius: inherit;
      color: #fe5f1e;

      &.selected {
        background-color: #fe5f1e;
        color: #fff;
      }

      &:hover {
        background-color: #fe5f1e;
        color: #fff;
      }
    }
  }
</style>
