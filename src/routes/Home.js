import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Search from "../components/Search";
import Map from "../components/Map";
import Places from "../components/Places";

const Home = () => {
  const { pending, data, error } = useSelector((state) => state.spots);

  return (
    <Container>
      <Header>Search</Header>
      <Search pending={pending} />
      {error ? (
        <h1>Oh no... something went wrong!</h1>
      ) : data ? (
        <Main>
          <Header>Map</Header>
          <Map spots={data} width="100%" height="600px" zoom="1.5" />
          <Header>Top Spots {data ? `(${data.geoJSON.length})` : null}</Header>
          <Places spots={data} />
        </Main>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.h1`
  margin: 30px 0 20px 0;
  font-size: 28px;
  font-weight: 900;
  color: #2d3748;
`;

const Main = styled.div``;

export default Home;
