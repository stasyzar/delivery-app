export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface Shop {
  _id: string;
  name: string;
  products: Product[];
}