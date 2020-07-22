import axios from "axios";

const baseUrl = "http://localhost:3005/spots";

export const getSpots = async (place_id) => {
  try {
    const response = await axios.get(`${baseUrl}/${place_id}`);
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
