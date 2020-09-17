import React from "react";
import styled from "styled-components";
import "./index.css";

// Import Swiper components
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// Install Swiper components
SwiperCore.use([Navigation]);

const PhotoModal = ({ photos, photoIndex, setPhotoIndex }) => {
  const i = photoIndex - 1;

  const start = photos.slice(i);
  const end = photos.slice(0, i);

  const photoSlides = [...start, ...end];

  return (
    <Container>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      >
        <Button onClick={() => setPhotoIndex(null)}>close</Button>
        {photoSlides.map((photo) => (
          <SwiperSlide>
            <Photo photo={photo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  background: #1a202c;
`;

const Photo = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${({ photo }) => `url(${photo})`};
`;

const Button = styled.button`
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
`;

export default PhotoModal;
