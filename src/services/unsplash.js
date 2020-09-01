import axios from "axios";

const cors = "http://localhost:8080";
const api = "https://api.unsplash.com";
const access_key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const headers = { headers: { Authorization: `Client-ID ${access_key}` } };

export const getRandom = async (setPhoto) => {
  const endpoint = "photos/random";
  const collections = "1460819";

  const url = `${cors}/${api}/${endpoint}?collections=${collections}`;
  try {
    const response = await axios.get(url, headers);
    console.log(response.data);
    setPhoto(response.data.urls.full);
  } catch (error) {
    console.log(error);
  }
};
