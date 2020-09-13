import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Import custom components
import Search from "../components/Search";
import { DisplayMap } from "../components/Map";
import { SpotList } from "../components/Places";

const SearchSpot = () => {
  const { data } = useSelector((state) => state.spots);

  return (
    <Container>
      <Header>Search</Header>
      <Search redirect={true} />
      <Header>Map</Header>
      <DisplayMap
        spots={data ? data.geoJSON : []}
        center={data ? data.coords : [-10, 30]}
        zoom={data ? 10 : 1}
        width="100%"
        height="600px"
      />
      <Header>Top Spots {data && `(${data.geoJSON.length})`}</Header>
      <SpotList spots={data ? data.geoJSON : null} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 60px 20px;
`;

const Header = styled.h1`
  margin: 30px 0 20px 0;
  font-size: 28px;
  font-weight: 900;
  color: #2d3748;
`;

export default SearchSpot;
