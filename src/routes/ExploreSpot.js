import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setMapViewportAction } from "../reducers/map";

import Search from "../components/Search";
import ExploreMap from "../components/Map/ExploreMap";
import { SpotList } from "../components/Places";

const ExploreSpot = () => {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.map);
  const render = viewport.cLat && viewport.cLng;

  // Get initial map center based on user location
  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      dispatch(setMapViewportAction({ cLat: latitude, cLng: longitude }));
    };

    const err = () => alert("PLEASE ENABLE LOCATION");

    navigator.geolocation.getCurrentPosition(success, err);
  }, []);

  return (
    <Container>
      <Sidebar>
        <Search explore={true} />
        <SpotList />
      </Sidebar>
      <Main>{render && <ExploreMap />}</Main>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Sidebar = styled.div`
  float: left;
  width: 400px;
  height: 100%;
  padding: 20px;
  overflow: scroll;
`;

const Main = styled.div`
  float: right;
  width: calc(100% - 400px);
  height: 100%;
`;

export default ExploreSpot;
