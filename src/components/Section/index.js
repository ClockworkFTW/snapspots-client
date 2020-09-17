import React, { useState } from "react";
import styled from "styled-components";

const Section = ({ headers, children }) => {
  const [active, setActive] = useState(0);

  return (
    <Container>
      {headers && (
        <Headers>
          {headers.map((header, i) => (
            <Header onClick={() => setActive(i)} active={active === i}>
              {header}
            </Header>
          ))}
        </Headers>
      )}
      <Content>{headers ? children[active] : children}</Content>
    </Container>
  );
};

const Container = styled.div``;

const Headers = styled.div`
  padding: 0 20px;
  background: #edf2f7;
`;

const Header = styled.h1`
  display: inline-block;
  margin-right: 50px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 900;
  color: ${({ active }) => (active ? "#ec8936" : "#4a5568")};
  border-bottom: ${({ active }) => (active ? "3px solid #ec8936" : "none")};
  &:hover {
    cursor: pointer;
    color: #ec8936;
  }
`;

const Content = styled.div`
  padding: 26px;
`;

export default Section;
