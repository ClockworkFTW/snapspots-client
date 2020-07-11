import React, { useState } from "react";

import Search from "./components/Search";
import Map from "./components/Map";
import Places from "./components/Places";

const App = () => {
  const [spots, setSpots] = useState(null);

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px" }}>
      <Search setSpots={setSpots} />
      <Map spots={spots} />
      <Places spots={spots} />
    </div>
  );
};

export default App;
