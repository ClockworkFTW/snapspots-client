import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const Slider = ({ photos, children, height }) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((photoIndex) =>
        photoIndex === photos.length - 1 ? 0 : photoIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container height={height}>
      <Content>{children}</Content>
      <Background photo={photos[photoIndex]} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
`;

const Content = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: ${(props) =>
    `linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7)), url(${props.photo})`};
  background-size: cover;
`;

export default Slider;
