import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import Slider from "../Slider";
import { ReviewRating } from "../Review";
import SpotStatus from "./SpotStatus";

const SpotCardLarge = ({ index, spot, handleSelect, setFocus }) => {
  // prettier-ignore
  const { spot_id, account_id, name, description, area, photos, reviews } = spot.properties;

  const title = index ? `#${index} - ${name}` : name;

  return (
    <Container onMouseEnter={() => (setFocus ? setFocus(spot) : null)}>
      <Photos>
        <Slider photos={photos} />
      </Photos>
      <Content onClick={() => (handleSelect ? handleSelect(index) : null)}>
        <Title>{title}</Title>
        <Area>{area}</Area>
        <Group>
          <SpotStatus spot_id={spot_id} account_id={account_id} />
          <ReviewRating reviews={reviews} size="20" />
        </Group>
        <Description>{description}</Description>
      </Content>
      <Favorite>
        <FontAwesomeIcon icon={["fal", "heart"]} />
      </Favorite>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;

const Photos = styled.div`
  flex: 0 0 300px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
`;

const Content = styled.div`
  height: 200px;
  margin-left: 20px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  white-space: nowrap;
  font-size: 22px;
  font-weight: 900;
  color: #2d3748;
`;

const Group = styled.div`
  display: flex;
`;

const Area = styled.h3`
  margin: 8px 0;
  font-size: 14px;
  color: #a0aec0;
`;

const Description = styled.p`
  margin-top: 10px;
  line-height: 24px;
  color: #718096;
`;

const Favorite = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  outline: none;
  color: #4a5568;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default SpotCardLarge;
