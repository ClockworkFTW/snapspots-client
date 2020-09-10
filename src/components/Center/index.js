import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Center = ({ children }) => {
  const { data, error } = useSelector((state) => state.photo);

  const render = data || error;

  return (
    render && (
      <Container url={data && data.urls.full}>
        {children}
        {!error && (
          <Credits>
            <FontAwesomeIcon icon={["far", "camera"]} /> Photo by{" "}
            <Link href={data.user.links.html}>{data.user.name}</Link> on{" "}
            <Link href="https://unsplash.com/">Unsplash</Link>
          </Credits>
        )}
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
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
`;

const Credits = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 8px 16px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 14px;
  color: #718096;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
`;

const Link = styled.a`
  text-decoration: none;
  color: #4299e1;
`;

export default Center;
