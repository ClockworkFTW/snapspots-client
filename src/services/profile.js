import axios from "axios";

const baseUrl = "http://localhost:3005/profile";

export const getProfile = async (account_id) => {
  try {
    const response = await axios.get(`${baseUrl}/${account_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
