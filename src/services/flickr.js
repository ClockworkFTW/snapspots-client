import axios from "axios";

const baseURL = "https://www.flickr.com/services/rest";
const api_key = process.env.REACT_APP_FLICKR_API_KEY;
const format = "format=json&nojsoncallback=1";

export const getPhotos = async (text) => {
  const method = "flickr.photos.search";

  const sort = "relevance";
  const per_page = "10";

  try {
    const response = await axios.get(
      `${baseURL}?method=${method}&api_key=${api_key}&text=${text}&sort=${sort}&per_page=${per_page}&${format}`
    );

    return response.data.photos.photo.map((photo) => {
      const src = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      return { ...photo, src };
    });
  } catch (error) {
    console.log(error);
  }
};

export const getInfo = async (photo_id) => {
  const method = "flickr.photos.getInfo";

  try {
    const response = await axios.get(
      `${baseURL}?method=${method}&api_key=${api_key}&photo_id=${photo_id}&${format}`
    );
    return response.data.photo;
  } catch (error) {
    console.log(error);
  }
};
