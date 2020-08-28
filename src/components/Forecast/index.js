import React from "react";
import styled from "styled-components";

import WeatherIcon from "./WeatherIcon";

const Forecast = ({ forecast }) => {
  return (
    <Container>
      {forecast.map(({ temp, weather }, i) => (
        <Day key={i}>
          <WeatherIcon icon={weather[0].icon} />
          <Temperature>
            {Math.round(temp.min)}&deg; / {Math.round(temp.max)}&deg; F
          </Temperature>
        </Day>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
`;

const Day = styled.li`
  flex: 1;
  text-align: center;
`;

const Temperature = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #a0aec0;
`;

export default Forecast;
