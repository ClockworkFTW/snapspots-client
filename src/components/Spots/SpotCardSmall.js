import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import Slider from "../Slider";
import { ReviewRating } from "../Review";
import SpotStatus from "./SpotStatus";

const SpotCardSmall = ({ index, spot, handleSelect, setFocus }) => {
  // prettier-ignore
  const { spot_id, account_id,  name, area, reviews, photos } = spot.properties;

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
      </Content>
      <Favorite>
        <FontAwesomeIcon icon={["fal", "heart"]} />
      </Favorite>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  overflow: hidden;
`;

const Photos = styled.div`
  height: 160px;
`;

const Content = styled.div`
  margin: 20px;
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
  align-items: center;
`;

const Area = styled.h3`
  margin: 8px 0;
  font-size: 14px;
  color: #a0aec0;
`;

const Favorite = styled.button`
  z-index: 20;
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  outline: none;
  color: #f7fafc;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default SpotCardSmall;
