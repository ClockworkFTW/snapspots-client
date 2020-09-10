import React from "react";
import styled from "styled-components";

const Footer = () => (
  <Wrapper>
    <Container>
      <Link href="https://github.com/ClockworkFTW">
        Made with love by Nik Boyle
      </Link>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  background: #4a5568;
  border-top: 1px solid #2d3748;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: #e2e8f0;
`;

export default Footer;
