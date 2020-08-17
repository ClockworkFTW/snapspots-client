import React from "react";

import Slider from "../Slider";

const Popup = ({ feature }) => {
  const { id, name } = feature.properties;

  const photos = JSON.parse(feature.properties.photos);

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      <Slider photos={photos} width="300px" height="200px" />
    </div>
  );
};

export default Popup;
