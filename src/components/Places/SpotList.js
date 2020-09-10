import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createSpotAction } from "../../reducers/spot";
import { setMapViewportAction } from "../../reducers/map";

import SpotCardLarge from "./SpotCardLarge";
import SpotCardSmall from "./SpotCardSmall";

const Places = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { pending, data, error } = useSelector((state) => state.spots);

  const handleSelect = (i) => {
    const spot = data.geoJSON[i];
    const {
      geometry: { coordinates },
      properties: { spot_id },
    } = spot;

    if (spot_id) {
      history.push(`/spot/${spot_id}`);
    } else {
      const newSpot = {
        custom: false,
        ...spot.properties,
        latitude: coordinates[1],
        longitude: coordinates[0],
      };

      dispatch(createSpotAction(newSpot, history));
    }
  };

  // Add popup on mouse enter
  const setFocus = (spot) => dispatch(setMapViewportAction({ focus: spot }));

  // Handle resizing
  const [width, setWidth] = useState(null);
  const container = useRef(null);

  useEffect(() => {
    const handleResize = () => setWidth(container.current.offsetWidth);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={container}>
      {data
        ? data.geoJSON.map((spot, i) =>
            width > 800 ? (
              <SpotCardLarge
                key={i}
                index={i + 1}
                spot={spot}
                handleSelect={handleSelect}
                setFocus={setFocus}
                width={width}
              />
            ) : (
              <SpotCardSmall
                key={i}
                index={i + 1}
                spot={spot}
                handleSelect={handleSelect}
                setFocus={setFocus}
                width={width}
              />
            )
          )
        : null}
    </div>
  );
};

export default Places;
