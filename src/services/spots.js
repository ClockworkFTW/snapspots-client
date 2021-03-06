import axios from "axios";
import queryString from "query-string";

import { setAuthHeader } from "../util";

const baseUrl = "/api/spots";

export const getSpot = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchSpots = async (place_id) => {
  try {
    const response = await axios.get(`${baseUrl}/search/${place_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const exploreSpots = async (viewport) => {
  try {
    const query = queryString.stringify(viewport);
    const response = await axios.get(`${baseUrl}/explore?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const previewSpots = async (setSpots, setError) => {
  try {
    const response = await axios.get(`${baseUrl}/preview`);
    setSpots(response.data);
  } catch (error) {
    setError(error);
  }
};

export const createSpot = async (spot) => {
  try {
    const response = await axios.post(`${baseUrl}/new`, spot, setAuthHeader());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSpot = async (spot) => {
  try {
    const response = await axios.post(
      `${baseUrl}/update`,
      spot,
      setAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reviewSpot = async (review) => {
  try {
    const response = await axios.post(
      `${baseUrl}/review`,
      review,
      setAuthHeader()
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
