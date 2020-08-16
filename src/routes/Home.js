import React, { useState } from "react";
import styled from "styled-components";

import Search from "../components/Search";
import Map from "../components/Map";
import Places from "../components/Places";

const Home = () => {
  const [spots, setSpots] = useState(null);

  return (
    <Container>
      <Header>Search</Header>
      <Search setSpots={setSpots} />
      <Header>Map</Header>
      <Map spots={spots} width="100%" height="600px" zoom="1.5" />
      <Header>Top Spots {spots ? `(${spots.geoJSON.length})` : null}</Header>
      <Places spots={spots} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.h1`
  margin: 30px 0 20px 0;
  font-size: 28px;
  font-weight: 900;
  color: #2d3748;
`;

export default Home;
