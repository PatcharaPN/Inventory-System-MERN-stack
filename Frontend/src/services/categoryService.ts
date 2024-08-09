import axios from "axios";
const CATEGORY_URL = "http://localhost:3000/api/categories/total";

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${CATEGORY_URL}`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
