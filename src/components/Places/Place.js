import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import Slider from "../Slider";
import { ReviewRating } from "../Review";
import Status from "./Status";

const Place = ({ index, properties, handleSelect, width }) => (
  <Container width={width}>
    <Photos width={width}>
      <Slider photos={properties.photos} />
    </Photos>
    <Content width={width} onClick={() => handleSelect(index)}>
      <Title>
        #{index + 1} - {properties.name}
      </Title>
      <Address>{properties.formatted_address}</Address>
      <Group>
        <Status properties={properties} />
        <ReviewRating reviews={properties.reviews} size="20" />
      </Group>
      <Description width={width}>{properties.description}</Description>
    </Content>
    <Favorite width={width}>
      <FontAwesomeIcon icon={["fal", "heart"]} />
    </Favorite>
  </Container>
);

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.width > 800 ? "row" : "column")};
  margin: 20px 0;
  padding: ${(props) => (props.width > 800 ? "20px" : "0")};
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;

const Photos = styled.div`
  flex: 0 0 300px;
  flex: ${(props) => (props.width > 800 ? "0 0 300px" : "0 0 160px")};
  height: 200px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: ${(props) => (props.width > 800 ? "8px" : "0")};
  border-bottom-right-radius: ${(props) => (props.width > 800 ? "8px" : "0")};
  overflow: hidden;
`;

const Content = styled.div`
  height: ${(props) => (props.width > 800 ? "200px" : "auto")};
  padding: ${(props) => (props.width > 800 ? "0 0 0 20px" : "20px")};
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 900;
  color: #2d3748;
`;

const Group = styled.div`
  display: flex;
`;

const Address = styled.h3`
  margin: 8px 0;
  font-size: 14px;
  color: #a0aec0;
`;

const Description = styled.p`
  display: ${(props) => (props.width > 800 ? "visible" : "none")};
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
  color: ${(props) => (props.width > 800 ? "#4a5568" : "#ffffff")};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default Place;
