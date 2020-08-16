import React from "react";
import styled from "styled-components";

import Slider from "../Slider";
import { ReviewRating } from "../Review";

const Places = ({ spots }) =>
  spots ? (
    <Wrapper>
      {spots.geoJSON.map(({ properties }, i) => (
        <Container key={properties.id}>
          <Photos>
            <Slider photos={properties.photos} />
          </Photos>
          <Content>
            <Title>
              #{i + 1} - {properties.name}
            </Title>
            <Vicinity>{properties.vicinity}</Vicinity>
            <ReviewRating reviews={properties.reviews} size="20" />
            <Description>{properties.description}</Description>
          </Content>
          <Buttons>
            <Button>like</Button>
            <Button>show more</Button>
          </Buttons>
        </Container>
      ))}
    </Wrapper>
  ) : null;

const Wrapper = styled.div``;

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

const Buttons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Button = styled.button``;

export default Places;
