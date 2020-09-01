import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { autocomplete } from "../../services/google";
import { getSpotsAction } from "../../reducers/spots";

const Search = ({ pending, error }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [predictions, setPredictions] = useState([]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearch(input);
    autocomplete(input, setPredictions);
  };

  const handleSelect = async ({ place_id, description }) => {
    setSearch(description);
    setPredictions([]);
    dispatch(getSpotsAction(place_id));
  };

  const handleClear = () => {
    setSearch("");
    setPredictions([]);
  };

  return (
    <Container pending={pending} error={error}>
      <Group>
        <Input
          type="text"
          placeholder="Enter a location"
          value={search}
          onChange={handleSearch}
        />
        <Button onClick={handleClear}>Clear</Button>
      </Group>
      {predictions && (
        <Predictions>
          {predictions.map((prediction, i) => (
            <Prediction key={i} onClick={() => handleSelect(prediction)}>
              {prediction.description}
            </Prediction>
          ))}
        </Predictions>
      )}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #a0aec0;
  border-radius: 4px;
  background: ${(props) => (props.pending ? "#BEE3F8" : "#FFFFFF")};
  overflow: hidden;
`;

const Group = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 0 30px;
  border: none;
  outline: none;
  background: #667eea;
  color: #ffffff;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const Predictions = styled.ul`
  padding: 0 8px;
`;

const Prediction = styled.li`
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
    color: #5a67d8;
  }
`;

export default Search;
