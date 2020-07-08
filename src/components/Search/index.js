import React, { useState } from "react";

import { autocomplete } from "../../services/google";
import { compilePOI } from "../../util";

const Search = ({ setPOI }) => {
  const [search, setSearch] = useState("");
  const [predictions, setPredictions] = useState([]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearch(input);
    autocomplete(input, setPredictions);
  };

  const handleSelect = async (place_id) => {
    setPredictions([]);
    const POI = await compilePOI(place_id);
    console.log(POI);
    setPOI(POI);
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
