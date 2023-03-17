export type CartItemType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

export interface ICartState {
  pizzas: CartItemType[];
}
