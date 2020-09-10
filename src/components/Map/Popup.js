import React from "react";
import styled from "styled-components";
import "./Popup.css";

import Slider from "../Slider";
import { ReviewRating } from "../Review";
import SpotStatus from "../Places/SpotStatus";

const Popup = ({ feature: { properties } }) => {
  const { place_id, name, formatted_address, photos, reviews } = properties;

  // const photos = JSON.parse(feature.properties.photos);

  return (
    <Container id={`popup-${place_id}`}>
      <Photos>
        <Slider photos={photos} autoplay={true} />
      </Photos>
      <Content>
        <Name>{name}</Name>
        <Address>{formatted_address}</Address>
        <Group>
          <SpotStatus properties={properties} />
          <ReviewRating rating={reviews} size="20" />
        </Group>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`;

const Photos = styled.div`
  flex: 0 0 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
`;

const Content = styled.div`
  max-height: 100px;
  margin-left: 10px;
  overflow: hidden;
`;

const Name = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
`;

const Address = styled.h3`
  margin: 4px 0;
  font-size: 14px;
  color: #a0aec0;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

export default Popup;
