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
