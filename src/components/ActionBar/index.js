import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ActionBar = ({ spot }) => {
  return (
    <Container>
      <Section>
        <Logo>
          <Icon icon={["far", "camera"]} />
        </Logo>
        <Text>Photos</Text>
      </Section>
      <Section>
        <Logo>
          <Icon icon={["far", "location-arrow"]} />
        </Logo>
        <Text>Directions</Text>
      </Section>
      <Section>
        <Logo>
          <Icon icon={["far", "inbox-out"]} />
        </Logo>
        <Text>Share</Text>
      </Section>
      <Section>
        <Logo>
          <Icon icon={["far", "ellipsis-h-alt"]} />
        </Logo>
        <Text>More</Text>
      </Section>
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
`;

const Section = styled.li`
  position: relative;
  flex: 1;
  padding-top: 24px;
  text-align: center;
  background: #667eea;
  &:hover {
    cursor: pointer;
    background: #7f9cf5;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.4);
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: #667eea;
`;

const Text = styled.h1`
  padding: 8px 0;
  color: #ffffff;
`;

export default ActionBar;
