export interface IItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  image: string;
}

export interface ICartItem {
  item: IItem;
  quantity: number;
}
