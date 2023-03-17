import { MutationTree } from 'vuex';
import { IFilterState, SortTypeEnum, SortItem } from '@/store/filter/types';

const state: IFilterState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sorts: {
    title: 'популярности (DESC) ↓',
    type: SortTypeEnum.RATING_DESC,
    order: 'desc',
  },
};

const mutations: MutationTree<IFilterState> = {
  setCategoryId(state, categoryId: number) {
    state.categoryId = categoryId;
  },
  setSearchValue(state, value: string) {
    state.searchValue = value;
  },
  setSorts(state, sorts: SortItem) {
    state.sorts = sorts;
  },
  setCurrentPage(state, page: number) {
    state.currentPage = page;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
