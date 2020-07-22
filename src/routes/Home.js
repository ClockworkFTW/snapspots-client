import React, { useState } from "react";
import styled from "styled-components";

import Search from "../components/Search";
import Map from "../components/Map";
import Places from "../components/Places";

const Home = () => {
  const [spots, setSpots] = useState(null);

  return (
    <Container>
      <Search setSpots={setSpots} />
      <Map spots={spots} width="100%" height="600px" zoom="1.5" />
      <Places spots={spots} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export default Home;
