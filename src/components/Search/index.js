import React, { useState } from "react";
import styled from "styled-components";

import { autocomplete } from "../../services/google";
import { compilePOI } from "../../util";

const Search = ({ setPOI, setGeoJSON }) => {
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
    const { POI, geoJSON } = await compilePOI(place_id);
    setPOI(POI);
    setGeoJSON(geoJSON);
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Enter a location"
        value={search}
        onChange={handleSearch}
      />
      {predictions.length === 0 ? null : (
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
  border: 1px solid black;
  border-radius: 4px;
  overflow: hidden;
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
