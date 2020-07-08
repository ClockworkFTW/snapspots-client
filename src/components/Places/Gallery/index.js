import React from "react";
import Masonry from "react-masonry-css";

import "./Masonry.css";

const Gallery = ({ photos, name }) => (
  <Masonry
    breakpointCols={4}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    {photos.map((photo, i) => (
      <img key={i} src={photo.src} alt={`${name}-${i}`} />
    ))}
  </Masonry>
);

export default Gallery;
