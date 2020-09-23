import axios from "axios";

import { setCors } from "../util";

const api = "https://maps.googleapis.com/maps/api";
const key = process.env.REACT_APP_GOOGLE_API_KEY;

export const autocomplete = async (input, setPredictions) => {
  const endpoint = "place/autocomplete/json";

  // prettier-ignore
  const url = `${setCors(api)}/${endpoint}?key=${key}&input=${input}`;

  try {
    const response = await axios.get(url);
    setPredictions(response.data.predictions);
  } catch (error) {
    console.log(error);
  }
};

export const geocode = async (place_id) => {
  const endpoint = "geocode/json";

  // prettier-ignore
  const url = `${setCors(api)}/${endpoint}?key=${key}&place_id=${place_id}`;

  try {
    const response = await axios.get(url);
    return response.data.results[0];
  } catch (error) {
    console.log(error);
  }
};
