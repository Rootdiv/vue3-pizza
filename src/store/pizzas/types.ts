export type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export type Pizzas = {
  pizzas: PizzaItem[];
  page: number;
  pages: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaState {
  items: PizzaItem[];
  page: number;
  pages: number;
  status: Status;
}
