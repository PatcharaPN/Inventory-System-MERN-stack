import axios from "axios";

const PriceAPI = "http://localhost:3000/api/price";
const Loginhistory = "http://localhost:3000/api/login";

export const fetchPrice = async () => {
  try {
    const response = await axios.get(`${PriceAPI}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getLoginHistory = async () => {
  try {
    const response = await axios.get(`${Loginhistory}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
