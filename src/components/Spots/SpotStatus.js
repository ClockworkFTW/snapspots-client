import React from "react";
import styled from "styled-components";

const SpotStatus = ({ spot_id, custom }) => {
  let status = {
    text: "Custom",
    color: "#F6AD55",
  };

  if (!spot_id && !custom) {
    status.text = "Undiscovered";
    status.color = "#63B3ED";
  } else if (spot_id && !custom) {
    status.text = "Discovered";
    status.color = "#68D391";
  }

  return <Container background={status.color}>{status.text}</Container>;
};

const Container = styled.div`
  display: inline-block;
  line-height: 20px;
  margin-right: 10px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 12px;
  color: #ffffff;
  background: ${(props) => props.background};
`;

export default SpotStatus;
