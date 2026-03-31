export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface Shop {
  _id: string;
  name: string;
  rating: number;
  products: Product[];
}