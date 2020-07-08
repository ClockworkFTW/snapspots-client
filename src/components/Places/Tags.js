import React from "react";
import styled from "styled-components";

const Tags = ({ tags }) => (
  <Container>
    {tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </Container>
);

const Container = styled.ul``;

const Tag = styled.li`
  display: inline-block;
  margin: 4px;
  padding: 6px 12px;
  border-radius: 4px;
  background: #edf2f7;
  font-size: 14px;
  color: #4a5568;
`;

export default Tags;
