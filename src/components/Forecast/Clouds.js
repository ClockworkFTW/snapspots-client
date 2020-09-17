import React from "react";
import moment from "moment";
import styled from "styled-components";

// Import custom components
import WeatherIcon from "./ForecastIcon";

// Import Swiper components
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// Instal Swiper components
SwiperCore.use([Autoplay]);

const Clouds = ({ forecast }) => {
  return (
    <Swiper spaceBetween={20} slidesPerView={5} autoplay={true} loop={true}>
      {forecast.map(({ dt, clouds }, i) => (
        <SwiperSlide key={i}>
          <Container>
            <Day>{moment.unix(dt).format("dddd")}</Day>
            <WeatherIcon icon="Cloud" size="50px" />
            <Percentage>{clouds}</Percentage>
            <Amount>
              {clouds > "75" ? "High" : clouds < "25" ? "Low" : "Med"}
            </Amount>
          </Container>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Container = styled.div`
  position: relative;
  text-align: center;
`;

const Day = styled.h3`
  margin-bottom: 3px;
  color: #4a5568;
`;

const Percentage = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  color: #63b3ed;
`;

const Amount = styled.h3`
  margin-top: 3px;
  font-size: 14px;
  color: #4a5568;
`;

export default Clouds;
