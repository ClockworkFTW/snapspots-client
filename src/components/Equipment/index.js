import React from "react";
import styled from "styled-components";

const Equipment = ({ equipment }) => {
  return (
    <Container>
      {equipment.map((item) => (
        <Item>{item}</Item>
      ))}
    </Container>
  );
};

const Container = styled.ul``;

const Item = styled.li`
  margin: 10px 0;
  color: #4a5568;
`;

export default Equipment;
