import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Center = ({ children }) => {
  const { data } = useSelector((state) => state.photo);

  return (
    data && (
      <Container url={data.urls.full}>
        {children}
        <Credits>
          Photo by <a href={data.user.links.html}>{data.user.name}</a> on{" "}
          <a href="https://unsplash.com/">Unsplash</a>
        </Credits>
      </Container>
    )
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
`;

const Credits = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 8px 16px;
  background: #ffffff;
  border-radius: 8px;
`;

export default Center;
