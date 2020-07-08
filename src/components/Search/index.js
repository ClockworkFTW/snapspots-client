import React, { useState } from "react";

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

  const handleSelect = async (place_id) => {
    setPredictions([]);
    const { POI, geoJSON } = await compilePOI(place_id);
    setPOI(POI);
    setGeoJSON(geoJSON);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a location"
        value={search}
        onChange={handleSearch}
      />
      <ul>
        {predictions.map((prediction, i) => (
          <li key={i} onClick={() => handleSelect(prediction.place_id)}>
            {prediction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
