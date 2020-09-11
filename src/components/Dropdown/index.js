import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({ name, options, value, setValue, style }) => {
  const [toggle, setToggle] = useState(false);

  const handleSelect = (option) => {
    if (value.includes(option)) {
      setValue(value.filter((v) => v !== option));
    } else {
      setValue([...value, option]);
    }
  };

  return (
    <Container style={style}>
      <Active onClick={() => setToggle(!toggle)}>{name}</Active>
      {toggle && (
        <Options>
          {options.map((option, i) => (
            <Option
              key={i}
              selected={value.includes(option)}
              onClick={() => handleSelect(option)}
            >
              {option}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: #ffffff;
`;

const Active = styled.div`
  padding: 10px;
  line-height: 20px;
  font-size: 14px;
  color: #a0aec0;
  &:hover {
    cursor: pointer;
  }
`;

const Options = styled.ul``;

const Option = styled.li`
  padding: 10px;
  line-height: 20px;
  font-size: 14px;
  color: #a0aec0;
  background: ${(props) => (props.selected ? "blue" : "none")};
  &:hover {
    cursor: pointer;
  }
`;

export default Dropdown;
