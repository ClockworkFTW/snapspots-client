import axios from "axios";

const baseUrl = "http://localhost:3005/spots";

export const getSpot = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpots = async (place_id) => {
  try {
    const response = await axios.get(`${baseUrl}/all/${place_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createSpot = async (spot) => {
  try {
    const response = await axios.post(baseUrl, spot);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const voteSpot = async (vote) => {
  try {
    const response = await axios.post(`${baseUrl}/vote`, vote);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
