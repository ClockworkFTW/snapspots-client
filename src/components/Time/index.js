import React from "react";
import styled from "styled-components";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Time = ({ time }) => (
  <Container>
    {months.map((month, i) => (
      <Month key={i} active={time.includes(i.toString())}>
        <Bar height={Math.random()} />
        <Text>{month}</Text>
      </Month>
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 160px;
`;

const Month = styled.div`
  flex: 1;
  margin: 0 8px;
  text-align: center;
`;

const Bar = styled.div`
  margin-top: auto;
  width: 100%;
  height: ${(props) => `${props.height * 160 - 22}px`};
  background: #667eea;
  border-radius: 8px;
`;

const Text = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #a0aec0;
`;

export default Time;
