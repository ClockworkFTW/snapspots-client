import React from "react";
import styled from "styled-components";

import asset1 from "../../assets/weather/Asset 1.svg";
import asset3 from "../../assets/weather/Asset 3.svg";
import asset5 from "../../assets/weather/Asset 5.svg";
import asset6 from "../../assets/weather/Asset 6.svg";
import asset8 from "../../assets/weather/Asset 8.svg";
import asset10 from "../../assets/weather/Asset 10.svg";
import asset13 from "../../assets/weather/Asset 13.svg";
import asset14 from "../../assets/weather/Asset 14.svg";
import asset18 from "../../assets/weather/Asset 18.svg";
import asset19 from "../../assets/weather/Asset 19.svg";
import asset23 from "../../assets/weather/Asset 23.svg";
import asset28 from "../../assets/weather/Asset 28.svg";
import asset33 from "../../assets/weather/Asset 33.svg";
import asset41 from "../../assets/weather/Asset 41.svg";
import asset43 from "../../assets/weather/Asset 43.svg";
import asset44 from "../../assets/weather/Asset 44.svg";
import asset45 from "../../assets/weather/Asset 45.svg";

const getIcon = (id) => {
  let icon;
  switch (id) {
    case "01d":
      icon = asset1;
      break;
    case "01n":
      icon = asset6;
      break;
    case "02d":
      icon = asset3;
      break;
    case "02n":
      icon = asset8;
      break;
    case "03d":
      icon = asset41;
      break;
    case "03n":
      icon = asset41;
      break;
    case "04d":
      icon = asset41;
      break;
    case "04n":
      icon = asset41;
      break;
    case "09d":
      icon = asset33;
      break;
    case "09n":
      icon = asset33;
      break;
    case "10d":
      icon = asset13;
      break;
    case "10n":
      icon = asset18;
      break;
    case "11d":
      icon = asset14;
      break;
    case "11n":
      icon = asset19;
      break;
    case "13d":
      icon = asset23;
      break;
    case "13n":
      icon = asset28;
      break;
    case "50d":
      icon = asset5;
      break;
    case "50n":
      icon = asset10;
      break;
    case "Sunrise":
      icon = asset43;
      break;
    case "Sunset":
      icon = asset44;
      break;
    case "Cloud":
      icon = asset45;
      break;
    default:
      icon = asset1;
      break;
  }
  return icon;
};

const ForecastIcon = ({ icon, size }) => (
  <Icon src={getIcon(icon)} size={size} />
);

const Icon = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

export default ForecastIcon;
