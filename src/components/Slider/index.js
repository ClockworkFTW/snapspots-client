import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// Import Swiper components
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// Instal Swiper components
SwiperCore.use([Autoplay]);

const Slider = ({ photos, children, width, height }) => (
  <Wrapper width={width} height={height}>
    {children && <Content>{children}</Content>}
    <Container>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={children ? true : false}
        disableOnInteraction={false}
        loop={true}
        style={{ width: "100%", height: "100%" }}
      >
        {photos.map((photo) => (
          <SwiperSlide>
            <Photo photo={photo} overlay={children ? true : false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background: #cbd5e0;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Content = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 40px;
  left: 30px;
  right: 30px;
`;

const Photo = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
    props.overlay
      ? `linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7)), url(${props.photo})`
      : `url(${props.photo})`};
  background-size: cover;
`;

export default Slider;
