import axios from "axios";

const baseUrl = "/api/profile";

export const getProfile = async (account_id) => {
  try {
    const response = await axios.get(`${baseUrl}/${account_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
