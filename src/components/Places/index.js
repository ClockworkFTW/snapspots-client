import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createSpotAction } from "../../reducers/spots";

import Place from "./Place";

const Places = ({ spots }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSelect = (i) => {
    const spot = spots.geoJSON[i];

    if (spot.id) {
      history.push(`/spot/${spot.id}`);
    } else {
      const newSpot = {
        custom: false,
        ...spot.properties,
        coordinates: spot.geometry.coordinates,
      };

      dispatch(createSpotAction(newSpot, history));
    }
  };

  return spots ? (
    <div>
      {spots.geoJSON.map(({ properties }, i) => (
        <Place
          key={i}
          index={i}
          properties={properties}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  ) : null;
};

export default Places;
