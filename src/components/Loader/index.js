import React from "react";
import styled from "styled-components";

const Loader = () => (
  <Container>
    <Spinner>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </Spinner>
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

const Spinner = styled.div`
  width: 200px;
  text-align: center;

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

const Bounce1 = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  background-color: #ed8936;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;

  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
`;

const Bounce2 = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  background-color: #ed8936;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;

  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
`;

const Bounce3 = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  background-color: #ed8936;

  border-radius: 100%;
  display: inline-block;

  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
`;

export default Loader;
