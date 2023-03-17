import { createStore, Store, useStore as baseUseStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import { InjectionKey } from 'vue';

import pizzasModule from '@/store/pizzas/module';
import filterModule from '@/store/filter/module';
import cartModule from '@/store/cart/module';
import { RootState } from '@/store/types';

const vuexLocal = new VuexPersist({
  key: 'pizza-cart-vue3',
  storage: localStorage,
  modules: ['cart'],
});

export const store = createStore<RootState>({
  modules: {
    pizzas: pizzasModule,
    filter: filterModule,
    cart: cartModule,
  },
  plugins: [vuexLocal.plugin],
});

//объявляем ключ инъекции с помощью интерфейса InjectionKey из Vue
export const key: InjectionKey<Store<RootState>> = Symbol();

//Создаём свой useStore с ключом (чтобы не импортировать дополнительно ключ)
//при этом не обходимо заменить все импорты useStore в компонентах
export const useStore = () => baseUseStore(key);
