import { IPizzaState } from '@/store/pizzas/types';
import { IFilterState } from '@/store/filter/types';
import { ICartState } from '@/store/cart/types';

export type RootState = {
  pizzas: IPizzaState;
  filter: IFilterState;
  cart: ICartState;
};
