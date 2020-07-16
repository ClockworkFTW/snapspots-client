import React from "react";
import Masonry from "react-masonry-css";
import styled from "styled-components";

import "./Masonry.css";

const Gallery = ({ photos, name, onClick, onError }) => (
  <Masonry
    breakpointCols={4}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    {photos.map((photo, i) => (
      <Image
        key={i}
        src={photo.src || photo}
        alt={`${name}-${i}`}
        onClick={onClick ? () => onClick(photo) : null}
        onError={onError ? () => onError(photo) : null}
      />
    ))}
  </Masonry>
);

const Image = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export default Gallery;
