import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://localhost:3005/spots";

export const getSpot = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchSpots = async (place_id) => {
  try {
    const response = await axios.get(`${baseUrl}/search/${place_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const exploreSpots = async (viewport) => {
  try {
    const query = queryString.stringify(viewport);
    const response = await axios.get(`${baseUrl}/explore?${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const previewSpots = async (setSpots) => {
  try {
    const response = await axios.get(`${baseUrl}/preview`);
    setSpots(response.data);
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

export const reviewSpot = async (review) => {
  try {
    const response = await axios.post(`${baseUrl}/review`, review);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
