import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { getSpotAction } from "../reducers/spot";

import Loader from "../components/Loader";
import Search from "../components/Search";
import Slider from "../components/Slider";
import ActionBar from "../components/ActionBar";
import SpotStatus from "../components/Spots/SpotStatus";
import Section from "../components/Section";
import Equipment from "../components/Equipment";
import Time from "../components/Time";
import { Weather, Clouds, Daylight } from "../components/Forecast";
import { ReviewList, ReviewForm, ReviewRating } from "../components/Review";
import { DisplayMap } from "../components/Map";
import { SpotList } from "../components/Spots";

const ViewSpot = () => {
  const dispatch = useDispatch();
  const { spot_id } = useParams();

  // prettier-ignore
  const { pending, data, error } = useSelector((state) => state.spot);

  useEffect(() => {
    if (data) {
      if (spot_id !== data.spot_id) {
        dispatch(getSpotAction(spot_id));
      }
    } else {
      dispatch(getSpotAction(spot_id));
    }
  }, [spot_id]);

  return pending ? (
    <Loader />
  ) : data ? (
    <Wrapper>
      <Search redirect={true} margin="0 0 20px 0" />
      <Container>
        <Slider photos={data.photos} effect="fade" height="360px">
          <Metadata>
            <Name>{data.name}</Name>
            <Group>
              <SpotStatus spot_id={data.spot_id} account_id={data.account_id} />
              <ReviewRating reviews={data.reviews} size="20" />
            </Group>
            <Area>{data.area}</Area>
          </Metadata>
        </Slider>
        <ActionBar spot={data} />
        <Content>
          <Main>
            <Section>
              <Description>{data.description}</Description>
              <div>
                {data.type.map((type) => (
                  <Type key={type}>{type}</Type>
                ))}
              </div>
            </Section>
            {data.equipment.length > 0 && (
              <Section
                headers={[`Equipment (${data.equipment.length})`, `Notes (0)`]}
              >
                <Equipment equipment={data.equipment} />
                <h1>test</h1>
              </Section>
            )}
            <Section headers={["Forecast", "Clouds", "Daylight"]}>
              <Weather forecast={data.forecast} />
              <Clouds forecast={data.forecast} />
              <Daylight forecast={data.forecast} />
            </Section>
            <Section
              headers={[`Reviews (${data.reviews.length})`, "Popular Times"]}
            >
              <>
                <ReviewForm spot_id={data.spot_id} name={data.name} />
                <ReviewList reviews={data.reviews} />
              </>
              <Time />
            </Section>
          </Main>
          <Sidebar>
            <DisplayMap
              width="300px"
              height="300px"
              center={[data.longitude, data.latitude]}
              spots={[
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [data.longitude, data.latitude],
                  },
                  properties: { ...data },
                },
              ]}
              zoom="12"
            />
            <Nearby>Nearby Spots</Nearby>
            {/* <SpotList place_id={data.place_id} /> */}
          </Sidebar>
        </Content>
      </Container>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 90px 20px;
`;

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
`;

const Content = styled.div``;

const Main = styled.div`
  float: left;
  width: calc(100% - 352px);
  height: 100%;
  border-right: 1px solid #e2e8f0;
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

const Area = styled.h3`
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
  border: 1px solid #4299e1;
  color: #4299e1;
  font-size: 14px;
`;

const Sidebar = styled.div`
  float: right;
  width: 352px;
  padding: 26px;
`;

const Nearby = styled.h2`
  margin: 40px 0 20px 0;
  font-size: 18px;
  font-weight: 900;
  color: #4a5568;
`;

export default ViewSpot;
