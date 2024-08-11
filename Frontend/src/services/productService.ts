import axios from "axios";

const API_URL = "http://localhost:3000/api/products";
const PRODUCT_GetAmont = "http://localhost:3000/api/getAmount/";
const createBrand = "http://localhost:3000/api/brand";
export const getAmount = async () => {
  try {
    const response = await axios.get(PRODUCT_GetAmont);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Error with getAmont service.");
  }
};
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const addProduct = async (formData: FormData) => {
  try {
    const response = await api.post(
      "http://localhost:3000/api/products/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addBrand = async (formData: FormData) => {
  try {
    const response = await axios.post(`${createBrand}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProduct = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteProduct = async (productId: string) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to delete product. Please try again.");
  }
};
