import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const getIcon = (id) => {
  let icon;
  switch (id) {
    case "01d":
      icon = "sun";
      break;
    case "01n":
      icon = "moon";
      break;
    case "02d":
      icon = "clouds-sun";
      break;
    case "02n":
      icon = "clouds-moon";
      break;
    case "03d":
      icon = "cloud";
      break;
    case "03n":
      icon = "cloud";
      break;
    case "04d":
      icon = "clouds";
      break;
    case "04n":
      icon = "clouds";
      break;
    case "09d":
      icon = "cloud-showers";
      break;
    case "09n":
      icon = "cloud-showers";
      break;
    case "10d":
      icon = "cloud-sun-rain";
      break;
    case "10n":
      icon = "cloud-moon-rain";
      break;
    case "11d":
      icon = "thunderstorm";
      break;
    case "11n":
      icon = "thunderstorm";
      break;
    case "13d":
      icon = "snowflake";
      break;
    case "13n":
      icon = "snowflake";
      break;
    case "50d":
      icon = "fog";
      break;
    case "50n":
      icon = "fog";
      break;
    default:
      icon = "sun";
      break;
  }
  return icon;
};

const WeatherIcon = ({ icon }) => <Container icon={["fal", getIcon(icon)]} />;

const Container = styled(FontAwesomeIcon)`
  font-size: 50px;
  color: #718096;
`;

export default WeatherIcon;
