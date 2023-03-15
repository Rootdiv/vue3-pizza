const state = {
  pizzas: [],
};

const getters = {
  cartPizzas: state => state.pizzas.map(({ id }) => state.pizzas.find(pizzaObj => pizzaObj.id === id)),

  cartItemsCount: state => id => {
    const findItem = state.pizzas.find(pizzaObj => pizzaObj.id === id);
    if (findItem) {
      return findItem.count;
    }
    return 0;
  },

  cartTotalPrice: state => state.pizzas.reduce((total, pizzaObj) => total + pizzaObj.price * pizzaObj.count, 0),

  cartTotalCount: state => state.pizzas.reduce((total, pizzaObj) => total + pizzaObj.count, 0),
};

const mutations = {
  pushToCart(state, pizzaObj) {
    state.pizzas.push({
      ...pizzaObj,
      count: 1,
    });
  },

  incrementItemCount(state, id) {
    const cartItem = state.pizzas.find(item => item.id === id);
    cartItem.count++;
  },

  decrementItemCount(state, id) {
    const cartItem = state.pizzas.find(item => item.id === id);
    if (cartItem.count > 1) {
      cartItem.count--;
    }
  },

  removeCartItems(state, newCartItems) {
    state.pizzas = newCartItems;
  },
};

const actions = {
  addToCart({ state, commit }, pizzaObj) {
    const findItem = state.pizzas.find(item => item.id === pizzaObj.id);
    if (findItem) {
      commit('incrementItemCount', findItem.id);
    } else {
      commit('pushToCart', { ...pizzaObj, count: 1 });
    }
  },

  removeItem({ state, commit }, id) {
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
  actions,
  mutations,
};
