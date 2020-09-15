import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// Import services
import { previewSpots } from "../services/spots";

// Import custom components
import Center from "../components/Center";
import Search from "../components/Search";
import { SpotPreviews } from "../components/Spots";

const Landing = () => {
  const history = useHistory();

  const [spots, setSpots] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    previewSpots(setSpots, setError);
  }, []);

  const handleSelect = (i) =>
    history.push(`/spot/${spots[i].properties.spot_id}`);

  return (
    spots && (
      <Center>
        <Container>
          <Welcome>
            <H1>Welcome to SnapSpots!</H1>
            <H2>
              We'll help you find great places to take photos, anywhere in the
              world.
            </H2>
          </Welcome>
          <Search fetch={true} width="600px" />
          <SpotPreviews
            spots={spots}
            error={error}
            handleSelect={handleSelect}
          />
        </Container>
      </Center>
    )
  );
};

const Container = styled.div`
  max-width: 1000px;
  padding: 20px;
`;

const Welcome = styled.div`
  margin-bottom: 20px;
  padding: 30px;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 0 20px #ffffff;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  font-size: 80px;
  font-weight: 900;
  color: #ed8936;
`;

const H2 = styled.h2`
  font-size: 24px;
  color: #2d3748;
  font-weight: 900;
`;

export default Landing;
