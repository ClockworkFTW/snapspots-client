import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import Slider from "../Slider";
import { ReviewRating } from "../Review";

const Place = ({ index, properties, handleSelect }) => (
  <Container onClick={() => handleSelect(index)}>
    <Photos>
      <Slider photos={properties.photos} />
    </Photos>
    <Content>
      <Title>
        #{index + 1} - {properties.name}
      </Title>
      <Vicinity>{properties.formatted_address}</Vicinity>
      <Group>
        <Status>Undiscovered</Status>
        <ReviewRating reviews={properties.reviews} size="20" />
      </Group>
      <Description>{properties.description}</Description>
    </Content>
    <Favorite>
      <FontAwesomeIcon icon={["fal", "heart"]} />
    </Favorite>
  </Container>
);

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
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 900;
  color: #2d3748;
`;

const Group = styled.div`
  display: flex;
`;

const Status = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  color: #ffffff;
  background: #63b3ed;
`;

const Vicinity = styled.h3`
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
`;

export default Place;
