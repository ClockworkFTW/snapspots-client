import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getSpotAction } from "../reducers/spot";

import Loader from "../components/Loader";
import Slider from "../components/Slider";
import ActionBar from "../components/ActionBar";
import SpotStatus from "../components/Places/SpotStatus";
import Time from "../components/Time";
import Forecast from "../components/Forecast";
import { ReviewList, ReviewForm, ReviewRating } from "../components/Review";
import { DisplayMap } from "../components/Map";
import { SpotList } from "../components/Places";

const ViewSpot = () => {
  const dispatch = useDispatch();
  const { spot_id } = useParams();

  const { pending, data, error } = useSelector((state) => state.spot);

  useEffect(() => {
    if (data) {
      if (spot_id !== data.properties.spot_id) {
        dispatch(getSpotAction(spot_id));
      }
    } else {
      dispatch(getSpotAction(spot_id));
    }
  }, [spot_id]);

  return pending ? (
    <Loader />
  ) : data ? (
    <Container>
      <Slider photos={data.properties.photos} height="360px">
        <Metadata>
          <Name>{data.properties.name}</Name>
          <Group>
            <SpotStatus properties={data.properties} />
            <ReviewRating reviews={data.properties.reviews} size="20" />
          </Group>
          <Address>{data.properties.formatted_address}</Address>
        </Metadata>
      </Slider>
      <ActionBar />
      <Content>
        <Main>
          <Section>
            <Description>{data.properties.description}</Description>
            <div>
              {data.properties.type.map((type) => (
                <Type key={type}>{type}</Type>
              ))}
            </div>
          </Section>
          <Header>Popular Times</Header>
          <Section>
            <Time time={data.properties.time} />
          </Section>
          <Header>Forecast</Header>
          <Section>
            <Forecast forecast={data.properties.forecast} />
          </Section>
          <Header>Reviews</Header>
          <Section>
            <ReviewForm
              spot_id={data.properties.spot_id}
              name={data.properties.name}
            />
            <ReviewList reviews={data.properties.reviews} />
          </Section>
        </Main>
        <Sidebar>
          <DisplayMap
            width="300px"
            height="300px"
            spots={{
              coords: data.geometry.coordinates,
              geoJSON: [data],
            }}
            zoom="12"
          />
          <h1
            style={{
              margin: "20px 0 10px 0",
              fontSize: "20px",
              fontWeight: "900",
              color: "#4a5568",
            }}
          >
            Nearby Spots
          </h1>
          <SpotList spots={data.properties.nearby} />
        </Sidebar>
      </Content>
    </Container>
  ) : null;
};

const Container = styled.div`
  max-width: 1000px;
  margin: 30px auto 90px auto;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
`;

const Main = styled.div``;

const Sidebar = styled.div`
  padding: 26px;
  border-left: 1px solid #e2e8f0;
`;

const Section = styled.div`
  padding: 26px;
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
  margin-bottom: 20px;
  line-height: 24px;
  color: #4a5568;
`;

const Type = styled.li`
  display: inline-block;
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #667eea;
  color: #667eea;
  font-size: 12px;
`;

export default ViewSpot;
