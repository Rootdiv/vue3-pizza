import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';

import pizzasModule from './pizzasModule';
import filterModule from './filterModule';
import cartModule from './cartModule';

const vuexLocal = new VuexPersist({
  key: 'pizza-cart-vue3',
  storage: localStorage,
  modules: ['cart'],
});

export default createStore({
  modules: {
    pizzas: pizzasModule,
    filter: filterModule,
    cart: cartModule,
  },
  plugins: [vuexLocal.plugin],
});
