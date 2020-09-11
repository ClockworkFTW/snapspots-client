import React from "react";
import styled from "styled-components";

const Center = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Center;
