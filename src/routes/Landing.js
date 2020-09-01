import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getRandom } from "../services/unsplash";

import Search from "../components/Search";

const Landing = () => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getRandom(setPhoto);
  }, []);

  return (
    <Wrapper>
      <Banner photo={photo}>
        <Container>
          <Center>
            <Content>
              <Welcome>Welcome to SnapSpots!</Welcome>
              <Intro>
                We'll help you find great places to take photos, anywhere in the
                world.
              </Intro>
              <Search />
            </Content>
          </Center>
        </Container>
      </Banner>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  position: relative;
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  text-align: center;
`;

const Banner = styled.div`
  width: 100%;
  height: 800px;
  background-image: ${(props) => `url(${props.photo})`};
  background-size: cover;
`;

const Welcome = styled.h1`
  font-size: 80px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.2);
`;

const Intro = styled.h2`
  font-size: 40px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.2);
`;

export default Landing;
