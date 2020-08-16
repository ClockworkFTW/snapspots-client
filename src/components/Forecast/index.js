import React from "react";
import styled from "styled-components";

import WeatherIcon from "./WeatherIcon";

const Forecast = ({ forecast }) => {
  return (
    <Container>
      {forecast.map(({ temp, weather }, i) => (
        <Day key={i}>
          <WeatherIcon icon={weather[0].icon} />
          {temp.min}/{temp.max}
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

export default Forecast;
