import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

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
    return response.data; // Assuming the backend response contains confirmation or details of deletion
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
    } else {
      // General error handling
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to delete product. Please try again.");
  }
};
