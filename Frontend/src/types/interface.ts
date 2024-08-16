export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  available: number;
  reserved: number;
  productID: string;
  quantity: number;
  priceunit: string;
  category: {
    _id: string;
    name: string;
  };
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

  location: string;
  productImage: string;

  __v: number;
}
export interface getAllAmount {
  totalStock: number;
}
export interface User {
  _id: string;
  username: string;
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
