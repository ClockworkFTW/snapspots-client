import React from "react";
import styled from "styled-components";

import Tags from "./Tags";
import Gallery from "./Gallery";

const Places = ({ POI }) => (
  <Container>
    {POI.map((place, i) => (
      <Place key={i}>
        <Header>
          <Title>{place.name}</Title>
          <Tags tags={place.tags} />
        </Header>
        <Gallery photos={place.photos} name={place.name} />
      </Place>
    ))}
  </Container>
);

const Container = styled.div``;

const Place = styled.div`
  margin-bottom: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 900;
`;

export default Places;
