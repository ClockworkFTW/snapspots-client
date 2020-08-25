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
  background: #cbd5e0;
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
  color: #4a5568;
`;

export default Footer;
