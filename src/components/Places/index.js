import React from "react";
import styled from "styled-components";

import Gallery from "./Gallery";

const Places = ({ spots }) =>
  spots ? (
    <Container>
      {spots.geoJSON.map(({ properties }) => (
        <Place key={properties.id}>
          <Title>{properties.name}</Title>
          <Gallery photos={properties.photos} name={properties.name} />
        </Place>
      ))}
    </Container>
  ) : null;

const Container = styled.div``;

const Place = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 900;
`;

export default Places;
