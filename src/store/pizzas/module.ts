import axios from 'axios';
import { MutationTree, ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { IPizzaState, Status, Pizzas, PizzaItem } from '@/store/pizzas/types';

const state: IPizzaState = {
  items: [],
  page: 1,
  pages: 1,
  status: Status.LOADING,
};

const mutations: MutationTree<IPizzaState> = {
  setStatus(state, load: Status) {
    state.status = load;
  },
  setPizzas(state, items: PizzaItem[]) {
    state.items = items;
  },
  setPage(state, page: number) {
    state.page = page;
  },
  setPages(state, pages: number) {
    state.pages = pages;
  },
};

const API_URL = import.meta.env.DEV ? 'http://localhost:2010' : 'https://rootdiv.ru:2010';

const actions: ActionTree<IPizzaState, RootState> = {
  fetchPizzas({ commit, rootState }) {
    const { sorts, categoryId, currentPage, searchValue } = rootState.filter;
    const category = categoryId !== 0 ? `category=${categoryId}&` : '';
    const search = searchValue !== '' ? `&search=${searchValue}` : '';
    const sortType = sorts.type.replace('-', '');
    const paramsUrl = `${category}sortby=${sortType}&order=${sorts.order}${search}`;
    try {
      commit('setStatus', 'loading');
      axios.get<Pizzas>(`${API_URL}/pizzas?page=${currentPage}&limit=4&${paramsUrl}`).then(response => {
        commit('setPage', response.data.page);
        commit('setPages', response.data.pages);
        commit('setPizzas', response.data.pizzas);
        commit('setStatus', 'success');
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error('Произошла ошибка:', err.message);
      }
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
