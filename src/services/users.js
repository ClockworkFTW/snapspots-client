import axios from "axios";

const baseUrl = "/api/users";

export const getUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/sign-in`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUser = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}/sign-up`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
