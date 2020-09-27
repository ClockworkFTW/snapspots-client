import React from "react";
import styled from "styled-components";

// Import custom components
import SpotCardSmall from "./SpotCardSmall";

// Import Swiper components
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// Instal Swiper components
SwiperCore.use([Autoplay]);

const SpotPreview = ({ spots, error, handleSelect }) =>
  error ? (
    <Error>Could not load spots...</Error>
  ) : (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      style={{ marginTop: "30px" }}
    >
      {spots.map((spot, i) => (
        <SwiperSlide key={i}>
          <SpotCardSmall
            key={i}
            spot={spot}
            handleSelect={() => handleSelect(i)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );

const Error = styled.h1`
  margin-top: 20px;
  text-align: center;
  color: #2d3748;
`;

export default SpotPreview;
