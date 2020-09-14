import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { setMapViewportAction } from "../reducers/map";

import Search from "../components/Search";
import ExploreMap from "../components/Map/ExploreMap";
import { SpotList } from "../components/Spots";

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

    const err = () => {
      dispatch(setMapViewportAction({ cLat: 37.7749, cLng: -122.4194 }));
    };

    navigator.geolocation.getCurrentPosition(success, err);
  }, []);

  return (
    <Container>
      <Sidebar>
        <Header>
          <Search />
        </Header>
        <Content>
          <SpotList />
        </Content>
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
  background: #edf2f7;
`;

const Sidebar = styled.div`
  position: relative;
  float: left;
  width: 400px;
  height: 100%;
`;

const Header = styled.div`
  padding: 20px 20px 10px 20px;
`;

const Content = styled.div`
  height: calc(100% - 80px);
  padding: 0 20px 20px 20px;
  overflow: scroll;
`;

const Main = styled.div`
  float: right;
  width: calc(100% - 400px);
  height: 100%;
`;

export default ExploreSpot;
