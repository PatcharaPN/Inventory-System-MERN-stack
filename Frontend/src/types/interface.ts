export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  available: number;
  reserved: number;
  createdBy: {
    _id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  category: {
    productCount: number;
    _id: string;
    name: string;
    createdBy: string;
    __v: number;
  };
  location: string;
  productImage: string;
  __v: number;
}
export interface User {
  name: string;
  role: string;
}
export interface Categories {
  _id: string;
  name: string;
  productCount: number;
  createdBy: {
    name: string;
    email: string;
    role: string;
  };
}

export interface CategorieState {
  category: Categories[];
  loading: boolean;
  error: string | null;
}
