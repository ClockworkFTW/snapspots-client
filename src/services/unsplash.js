import axios from "axios";

const cors = "http://localhost:8080";
const api = "https://api.unsplash.com";
const access_key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const headers = { headers: { Authorization: `Client-ID ${access_key}` } };

export const getRandom = async () => {
  const endpoint = "photos/random";
  const collections = "317099";
  const orientation = "landscape";

  const url = `${cors}/${api}/${endpoint}?collections=${collections}&orientation=${orientation}`;
  try {
    const response = await axios.get(url, headers);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
