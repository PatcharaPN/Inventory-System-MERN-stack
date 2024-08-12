import axios from "axios";

const PriceAPI = "http://localhost:3000/api/price";
const Loginhistory = "http://localhost:3000/api/login";
const FetchStore = "http://localhost:3000/api/store";
const FetchBrand = "http://localhost:3000/api/brand";
const CreateStore = "http://localhost:3000/api/Store";

export const fetchPrice = async () => {
  try {
    const response = await axios.get(`${PriceAPI}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    throw error;
  }
};
export const createStore = async (storeData: {
  name: string;
  address: string;
  addedBy: string;
}) => {
  try {
    const response = await axios.post("/api/store", storeData);
    return response.data;
  } catch (error) {
    console.error("Error creating store:", error);
    throw error;
  }
};

export const fetchBrand = async () => {
  try {
    const response = await axios.get(`${FetchBrand}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand data:", error);
    throw error;
  }
};
export const getLoginHistory = async () => {
  try {
    const response = await axios.get(`${Loginhistory}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching login history data:", error);
    throw error;
  }
};
export const fetchStore = async () => {
  try {
    const response = await axios.get(FetchStore);
    return response.data;
  } catch (error) {
    console.error("Error fetching store data:", error);
    throw error;
  }
};
