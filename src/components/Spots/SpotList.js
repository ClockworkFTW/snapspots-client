import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createSpotAction } from "../../reducers/spot";
import { searchSpotsAction } from "../../reducers/spots";
import { setMapAction } from "../../reducers/map";

import SpotCardLarge from "./SpotCardLarge";
import SpotCardSmall from "./SpotCardSmall";
import Profile from "../../routes/Profile";

const SpotList = ({ place_id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (place_id) {
      dispatch(searchSpotsAction(place_id));
    }
  }, []);

  // Select spots from redux and sort based on average review rating
  const spots = useSelector((state) => {
    if (state.spots.data) {
      return state.spots.data.geoJSON.sort((a, b) => {
        const reviewsA = a.properties.reviews;
        const reviewsB = b.properties.reviews;

        const avgRatingReviewsA =
          reviewsA.length === 0
            ? 0
            : reviewsA.reduce((acc, cur) => acc + cur.rating, 0) /
              reviewsA.length;
        const avgRatingReviewsB =
          reviewsB.length === 0
            ? 0
            : reviewsB.reduce((acc, cur) => acc + cur.rating, 0) /
              reviewsB.length;

        return avgRatingReviewsB - avgRatingReviewsA;
      });
    } else {
      return null;
    }
  });

  const user = useSelector((state) => state.user.data);

  // If the spot is in the database, redirect to the view page, otherwise create a new spot if the user is logged in
  const handleSelect = (i) => {
    const spot = spots[i - 1];
    // prettier-ignore
    const { geometry: { coordinates }, properties: { spot_id } } = spot;

    if (spot_id) {
      history.push(`/spot/${spot_id}`);
    } else {
      if (user) {
        const newSpot = {
          custom: false,
          account_id: user.account_id,
          ...spot.properties,
          type: [],
          equipment: [],
          latitude: coordinates[1],
          longitude: coordinates[0],
        };

        dispatch(createSpotAction(newSpot, history));
      } else {
        history.push("/sign-in");
      }
    }
  };

  // Add popup to the map on mouse enter
  const setFocus = (spot) => dispatch(setMapAction({ focus: spot }));

  // Handle rendering of cards based on container width
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
      {spots
        ? spots.map((spot, i) =>
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

export default SpotList;
