import axios from 'axios';

const state = {
  items: [],
  page: 1,
  pages: 1,
  status: 'loading',
};

const mutations = {
  setStatus(state, load) {
    state.status = load;
  },
  setPizzas(state, items) {
    state.items = items;
  },
  setPage(state, page) {
    state.page = page;
  },
  setPages(state, pages) {
    state.pages = pages;
  },
};

const API_URL = import.meta.env.DEV ? 'http://localhost:2010' : 'https://rootdiv.ru:2010';

const actions = {
  fetchPizzas({ commit, rootState }) {
    const { sorts, categoryId, currentPage, searchValue } = rootState.filter;
    const category = categoryId !== 0 ? `category=${categoryId}&` : '';
    const search = searchValue !== '' ? `&search=${searchValue}` : '';
    const sortType = sorts.type.replace('-', '');
    const paramsUrl = `${category}sortby=${sortType}&order=${sorts.order}${search}`;
    try {
      commit('setStatus', 'loading');
      axios.get(`${API_URL}/pizzas?page=${currentPage}&limit=4&${paramsUrl}`).then(response => {
        commit('setPage', response.data.page);
        commit('setPages', response.data.pages);
        commit('setPizzas', response.data.pizzas);
        commit('setStatus', 'success');
      });
    } catch (err) {
      console.error('Произошла ошибка:', err.message);
      commit('setStatus', 'error');
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
