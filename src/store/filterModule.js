const state = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sorts: {
    title: 'популярности (DESC) ↓',
    type: 'rating',
    order: 'desc',
  },
};

const mutations = {
  setCategoryId(state, categoryId) {
    state.categoryId = categoryId;
  },
  setSearchValue(state, value) {
    state.searchValue = value;
  },
  setSorts(state, sorts) {
    state.sorts = sorts;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
