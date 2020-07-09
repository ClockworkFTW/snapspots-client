import React from "react";

const Popup = ({ feature }) => {
  const { id, name } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
    </div>
  );
};

export default Popup;
