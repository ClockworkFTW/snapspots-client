import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { autocomplete, geocode } from "../../services/google";
import { searchSpotsAction } from "../../reducers/spots";
import { setMapViewportAction } from "../../reducers/map";

const Search = ({ explore, width }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { pending, error } = useSelector((state) => state.spots);

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
    if (explore) {
      const place = await geocode(place_id);
      const { lat, lng } = place.geometry.location;
      dispatch(setMapViewportAction({ zoom: 12, cLat: lat, cLng: lng }));
    } else {
      dispatch(searchSpotsAction(place_id, history));
    }
  };

  const handleClear = () => {
    setSearch("");
    setPredictions([]);
  };

  return (
    <Container width={width}>
      <SearchBar pending={pending} error={error}>
        {error ? (
          <Icon icon={["fas", "exclamation-circle"]} error={error} />
        ) : pending ? (
          <Icon icon={["fas", "spinner-third"]} pending={pending} spin />
        ) : (
          <Icon icon={["fas", "search"]} pending={pending} />
        )}
        <Input
          type="text"
          placeholder={pending ? "Searching..." : "Enter a location..."}
          value={search}
          onChange={handleSearch}
          onClick={handleClear}
        />
      </SearchBar>
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
  margin: ${({ width }) => (width ? "0 auto" : "none")};
  width: ${({ width }) => (width ? width : "100%")};
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  border: 2px solid
    ${({ pending, error }) =>
      error ? "#F56565" : pending ? "#4299E1" : "#FFFFFF"};
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 16px;
  color: #2d3748;
  &::placeholder {
    color: #a0aec0;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 0 4px 0 10px;
  color: ${({ pending, error }) =>
    error ? "#F56565" : pending ? "#4299E1" : "#CBD5E0"};
  font-size: 20px;
`;

const Predictions = styled.ul`
  margin-top: 10px;
  background: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
`;

const Prediction = styled.li`
  padding: 8px;
  white-space: nowrap;
  color: #2d3748;
  &:hover {
    cursor: pointer;
    color: #4299e1;
    background: #ebf8ff;
  }
`;

export default Search;
