import { geocode, getPOI } from "../services/google";
import { getPhotos, getInfo } from "../services/flickr";

export const compilePOI = async (place_id) => {
  const location = await geocode(place_id);

  let POI = await getPOI(location);

  POI = await Promise.all(
    POI.map(async (place) => {
      let photos = await getPhotos(place.name);

      photos = await Promise.all(
        photos.map(async (photo) => {
          const info = await getInfo(photo.id);

          return { ...photo, ...info };
        })
      );

      let tags = photos.map((photo) => photo.tags.tag).flat();
      tags = tags.map((tag) => filterTag(tag.raw)).filter((tag) => tag);
      tags = [...new Set(tags)];

      return { ...place, photos, tags };
    })
  );

  const geoJSON = compileGeoJSON(POI);

  return { POI, geoJSON };
};

const filterTag = (tag) => {
  const types = [
    {
      name: "landscape",
      related: ["landscape", "valley", "vista", "mountain", "hill", "canyon"],
    },
    {
      name: "nature",
      related: ["nature", "tree", "flower", "field"],
    },
    {
      name: "water",
      related: ["water", "ocean", "sea", "lake", "river", "beach"],
    },
    {
      name: "animals",
      related: ["animals", "zoo", "aquarium"],
    },
    {
      name: "people",
      related: ["people", "portrait", "face"],
    },
    {
      name: "architecture",
      related: ["architecture", "building"],
    },
    {
      name: "city",
      related: ["city", "urban"],
    },
    {
      name: "panoramic",
      related: ["panoramic", "panorama", "vista"],
    },
    {
      name: "sunset/sunrise",
      related: ["sunset", "sunrise"],
    },
  ];

  let match = null;

  types.forEach((type) => {
    type.related.forEach((rel) => {
      if (tag.toLowerCase().includes(rel)) {
        match = type.name;
      }
    });
  });

  return match;
};

const compileGeoJSON = (POI) =>
  POI.map((place) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [place.geometry.location.lng, place.geometry.location.lat],
    },
    properties: {
      id: place.id,
      name: place.name,
    },
  }));
