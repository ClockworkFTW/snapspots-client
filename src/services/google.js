import axios from "axios";

const cors = "https://cors-anywhere.herokuapp.com";
const api = "https://maps.googleapis.com/maps/api";
const key = "AIzaSyBl8x4xP326HXYA4_nngCwbnbbIlL8J4Xk";

export const autocomplete = async (input, setPredictions) => {
  const endpoint = "place/autocomplete/json";

  const url = `${cors}/${api}/${endpoint}?key=${key}&input=${input}`;
  try {
    const response = await axios.get(url);
    setPredictions(response.data.predictions);
  } catch (error) {
    console.log(error);
  }
};

export const geocode = async (place_id) => {
  const endpoint = "geocode/json";

  const url = `${cors}/${api}/${endpoint}?key=${key}&place_id=${place_id}`;
  try {
    const response = await axios.get(url);
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.log(error);
  }
};

export const getPOI = async ({ lat, lng }) => {
  const endpoint = "place/nearbysearch/json";

  const type = "tourist_attraction";
  const radius = "50000";

  const url = `${cors}/${api}/${endpoint}?key=${key}&location=${lat},${lng}&radius=${radius}&type=${type}`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
