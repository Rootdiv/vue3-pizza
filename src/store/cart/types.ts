export type CartItemType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  dough: string;
  size: number;
  count: number;
};

export interface ICartState {
  pizzas: CartItemType[];
}
