import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getSpotAction } from "../reducers/spots";

import Votes from "../components/Votes";
import Gallery from "../components/Places/Gallery";

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
      <Info>
        <Votes spot_id={spot.spot_id} votes={spot.votes} />
        <Group>
          <Name>{spot.name}</Name>
          {spot.description && <Description>{spot.description}</Description>}
          {spot.type.map((type) => (
            <Type key={type}>{type}</Type>
          ))}
        </Group>
      </Info>
      <Gallery photos={spot.photos} name={spot.name} />
    </Container>
  ) : null;
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const Group = styled.div``;

const Name = styled.h1`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
`;

const Description = styled.p`
  margin-bottom: 20px;
  line-height: 24px;
  color: #4a5568;
`;

const Type = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  background: #2b5282;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
`;

export default SpotPage;
