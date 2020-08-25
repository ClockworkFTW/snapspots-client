import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getSpotAction } from "../reducers/spots";

import Slider from "../components/Slider";
import ActionBar from "../components/ActionBar";
import Status from "../components/Places/Status";
import Forecast from "../components/Forecast";
import { ReviewList, ReviewForm, ReviewRating } from "../components/Review";

const SpotPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spots.data);

  useEffect(() => {
    dispatch(getSpotAction(id));
  }, []);

  return spot ? (
    <Container>
      <Slider photos={spot.properties.photos} height="360px">
        <Metadata>
          <Name>{spot.properties.name}</Name>
          <Group>
            <Status properties={spot.properties} />
            <ReviewRating reviews={spot.properties.reviews} size="20" />
          </Group>
          <Address>{spot.properties.formatted_address}</Address>
        </Metadata>
      </Slider>
      <ActionBar spot={spot} />
      <Section>
        <Description>{spot.properties.description}</Description>
        <Types>
          {spot.properties.type.map((type) => (
            <Type key={type}>{type}</Type>
          ))}
        </Types>
      </Section>
      <Header>Forecast</Header>
      <Section>
        <Forecast forecast={spot.properties.forecast} />
      </Section>
      <Header>Reviews</Header>
      <Section>
        <ReviewForm
          spot_id={spot.properties.spot_id}
          name={spot.properties.name}
        />
        <ReviewList reviews={spot.properties.reviews} />
      </Section>
    </Container>
  ) : null;
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  overflow: hidden;
`;

const Section = styled.div`
  padding: 40px 20px;
`;

const Header = styled.h1`
  padding: 20px;
  font-size: 20px;
  font-weight: 900;
  color: #4a5568;
  background: #edf2f7;
`;

const Group = styled.div`
  display: flex;
`;

const Metadata = styled.div``;

const Name = styled.h1`
  margin-bottom: 8px;
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
`;

const Address = styled.h3`
  margin-top: 8px;
  font-size: 14px;
  color: #ffffff;
`;

const Description = styled.p`
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
