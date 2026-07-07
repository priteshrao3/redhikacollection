export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  color?: string;
  size?: string;
}

export interface CartState {
  items: CartItem[];
}
