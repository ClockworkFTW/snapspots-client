import React from "react";
import moment from "moment";
import styled from "styled-components";

// Import custom components
import ForecastIcon from "./ForecastIcon";

const Forecast = ({ forecast }) => (
  <Wrapper>
    {[
      { header: "Sunrise", time: forecast[0].sunrise },
      { header: "Sunset", time: forecast[0].sunset },
    ].map((period, i) => (
      <Container key={i}>
        <Header>{period.header}</Header>
        <ForecastIcon icon={period.header} size="50px" />
        <Time>{moment.unix(period.time).format("h:mmA")}</Time>
      </Container>
    ))}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Container = styled.div`
  text-align: center;
`;

const Header = styled.h3`
  margin-bottom: 3px;
  color: #4a5568;
`;

const Time = styled.h3`
  margin-top: 3px;
  font-size: 14px;
  color: #4a5568;
`;

export default Forecast;
