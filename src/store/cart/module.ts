import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { ICartState } from '@/store/cart/types';
import { CartItemType } from './types';

const state: ICartState = {
  pizzas: [],
};

const getters: GetterTree<ICartState, RootState> = {
  cartPizzas: state => state.pizzas.map(({ id }) => state.pizzas.find(pizzaObj => pizzaObj.id === id)),

  cartItemsCount: state => (id: number) => {
    const findItem = state.pizzas.find(pizzaObj => pizzaObj.id === id);
    if (findItem) {
      return findItem.count;
    }
    return 0;
  },

  cartTotalPrice: state => state.pizzas.reduce((total, pizzaObj) => total + pizzaObj.price * pizzaObj.count, 0),

  cartTotalCount: state => state.pizzas.reduce((total, pizzaObj) => total + pizzaObj.count, 0),
};

const mutations: MutationTree<ICartState> = {
  pushToCart(state, pizzaObj) {
    state.pizzas.push({
      ...pizzaObj,
      count: 1,
    });
  },

  incrementItemCount(state, id: number) {
    const cartItem = state.pizzas.find(item => item.id === id);
    if (typeof cartItem !== 'undefined') {
      cartItem.count++;
    }
  },

  decrementItemCount(state, id: number) {
    const cartItem = state.pizzas.find(item => item.id === id);
    if (cartItem && cartItem.count > 1) {
      cartItem.count--;
    }
  },

  removeCartItems(state, newCartItems: CartItemType[]) {
    state.pizzas = newCartItems;
  },
};

const actions: ActionTree<ICartState, RootState> = {
  addToCart({ state, commit }, pizzaObj: CartItemType) {
    const findItem = state.pizzas.find(item => item.id === pizzaObj.id);
    if (findItem) {
      commit('incrementItemCount', findItem.id);
    } else {
      commit('pushToCart', { ...pizzaObj, count: 1 });
    }
  },

  removeItem({ state, commit }, id: number) {
    const newCartItems = state.pizzas.filter(item => item.id !== id);
    commit('removeCartItems', newCartItems);
  },

  clearCart({ commit }) {
    commit('removeCartItems', []);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
