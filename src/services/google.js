import axios from "axios";

const cors = "https://cors-anywhere.herokuapp.com";
const api = "https://maps.googleapis.com/maps/api";
const key = process.env.REACT_APP_GOOGLE_API_KEY;

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
