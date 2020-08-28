import React from "react";
import styled from "styled-components";

const Loader = () => (
  <Container>
    <Message>LOADING...</Message>
  </Container>
);

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

const Message = styled.h1`
  font-size: 40px;
  font-weight: 900;
`;

export default Loader;
