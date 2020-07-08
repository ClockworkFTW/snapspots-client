import React, { useState } from "react";

import Search from "./components/Search";
import Places from "./components/Places";

const App = () => {
  const [POI, setPOI] = useState([]);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px" }}>
      <Search setPOI={setPOI} />
      <Places POI={POI} />
    </div>
  );
};

export default App;
