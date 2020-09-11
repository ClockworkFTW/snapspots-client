import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Footer = () => (
  <Wrapper>
    <Container>
      <Link href="https://github.com/ClockworkFTW">
        Made with <FontAwesomeIcon icon={["fas", "coffee"]} /> by Nik Boyle
      </Link>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  background: #2d3748;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 0;
`;

const Link = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #e2e8f0;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export default Footer;
