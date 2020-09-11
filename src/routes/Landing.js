import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Import services
import { previewSpots } from "../services/spots";

// Import custom components
import Center from "../components/Center";
import Search from "../components/Search";
import { SpotPreviews } from "../components/Places";

const Landing = () => {
  const [spots, setSpots] = useState(null);

  useEffect(() => {
    previewSpots(setSpots);
  }, []);

  return (
    <Center>
      {spots && (
        <Container>
          <Welcome>
            <H1>Welcome to SnapSpots!</H1>
            <H2>
              We'll help you find great places to take photos, anywhere in the
              world.
            </H2>
          </Welcome>
          <Search width="600px" />
          <SpotPreviews spots={spots} />
        </Container>
      )}
    </Center>
  );
};

const Container = styled.div`
  max-width: 1000px;
  padding: 20px;
`;

const Welcome = styled.div`
  margin-bottom: 40px;
  text-align: center;
  color: #2d3748;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  font-size: 80px;
  font-weight: 900;
`;

const H2 = styled.h2`
  font-size: 30px;
`;

export default Landing;
