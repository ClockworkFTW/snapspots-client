import React, { useState } from "react";

import Search from "./components/Search";
import Map from "./components/Map";
import Places from "./components/Places";

const App = () => {
  const [POI, setPOI] = useState([]);
  const [geoJSON, setGeoJSON] = useState([]);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px" }}>
      <Search setPOI={setPOI} setGeoJSON={setGeoJSON} />
      <Map geoJSON={geoJSON} />
      <Places POI={POI} />
    </div>
  );
};

export default App;
