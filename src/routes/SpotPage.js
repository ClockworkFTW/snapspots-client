import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getSpotAction } from "../reducers/spots";

import Slider from "../components/Slider";
import ActionBar from "../components/ActionBar";
import Forecast from "../components/Forecast";
import { ReviewList, ReviewForm, ReviewRating } from "../components/Review";

const SpotPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots.data);

  useEffect(() => {
    if (!spot) {
      dispatch(getSpotAction(id));
    }
  }, []);

  return spot ? (
    <Container>
      <Slider photos={spot.photos} height="360px">
        <Metadata>
          <Name>{spot.name}</Name>
          <ReviewRating reviews={spot.reviews} size="20" />
        </Metadata>
      </Slider>
      <ActionBar spot={spot} />
      <Description>{spot.description}</Description>
      <Types>
        {spot.type.map((type) => (
          <Type key={type}>{type}</Type>
        ))}
      </Types>
      <Forecast forecast={spot.forecast} />
      <ReviewForm spot_id={spot.spot_id} name={spot.name} />
      <ReviewList reviews={spot.reviews} />
    </Container>
  ) : null;
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Metadata = styled.div``;

const Name = styled.h1`
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
`;

const Description = styled.p`
  margin: 20px 0;
  line-height: 24px;
  color: #4a5568;
`;

const Types = styled.ul`
  margin-top: 20px;
`;

const Type = styled.li`
  display: inline-block;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ec8936;
  color: #ec8936;
  font-size: 12px;
`;

export default SpotPage;
