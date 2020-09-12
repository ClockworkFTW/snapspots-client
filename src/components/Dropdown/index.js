import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({ name, options, value, setValue }) => {
  const [toggle, setToggle] = useState(false);

  const handleSelect = (option) => {
    if (value.includes(option)) {
      setValue(value.filter((v) => v !== option));
    } else {
      setValue([...value, option]);
    }
  };

  return (
    <Container>
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
  position: relative;
  width: 100%;
`;

const Active = styled.div`
  padding: 10px;
  line-height: 20px;
  font-size: 14px;
  color: #a0aec0;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;

const Options = styled.ul`
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  transform: translateY(100%);
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background: #ffffff;
`;

const Option = styled.li`
  padding: 10px;
  line-height: 20px;
  font-size: 14px;
  color: ${({ selected }) => (selected ? "#ffffff" : "#a0aec0")};
  background: ${({ selected }) => (selected ? "#ED8936" : "none")};
  &:hover {
    cursor: pointer;
    color: ${({ selected }) => (selected ? "#ffffff" : "#ed8936")};
    background: ${({ selected }) => (selected ? "#ED8936" : "#fffaf0")};
  }
`;

export default Dropdown;
