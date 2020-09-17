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

const Forecast = ({ forecast }) => {
  return (
    <Swiper spaceBetween={20} slidesPerView={5} autoplay={true} loop={true}>
      {forecast.map(({ dt, temp, weather }, i) => (
        <SwiperSlide key={i}>
          <Container>
            <Day>{moment.unix(dt).format("dddd")}</Day>
            <WeatherIcon icon={weather[0].icon} size="40px" />
            <Temperature>
              {Math.round(temp.min)}&deg; / {Math.round(temp.max)}&deg; F
            </Temperature>
          </Container>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Day = styled.h3`
  margin-bottom: 8px;
  color: #4a5568;
`;

const Temperature = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #4a5568;
`;

export default Forecast;
