import axios from "axios";

const API_URL = "http://localhost:3000/api/products";
const PRODUCT_GetAmont = "http://localhost:3000/api/getAmount/";

export const getAmount = async () => {
  try {
    const response = await axios.get(PRODUCT_GetAmont);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error("Error with getAmont service.");
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
