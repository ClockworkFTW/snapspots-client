import React from "react";
import Masonry from "react-masonry-css";
import styled from "styled-components";

import "./index.css";

const Gallery = ({ photos, name, cols, onClick, onError }) => (
  <Masonry
    breakpointCols={cols}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    {photos.map((photo, i) => (
      <Image
        key={i}
        src={photo}
        alt={`${name}-${i}`}
        onClick={onClick ? () => onClick(photo) : null}
        onError={onError ? () => onError(photo) : null}
      />
    ))}
  </Masonry>
);

const Image = styled.img`
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
`;

export default Gallery;
