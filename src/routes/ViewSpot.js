import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
import { SpotListWithData } from "../components/Places";

const ViewSpot = () => {
  const dispatch = useDispatch();
  const { spot_id } = useParams();

  // prettier-ignore
  const user = useSelector((state) => state.user);
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

  const canEdit = () => {
    if (user.data) {
      if (data.custom) {
        return user.data.account_id === data.account_id;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  return pending ? (
    <Loader />
  ) : data ? (
    <Container>
      <Slider photos={data.photos} height="360px">
        <Metadata>
          <Name>{data.name}</Name>
          <Group>
            <SpotStatus spot_id={data.spot_id} account_id={data.account_id} />
            <ReviewRating reviews={data.reviews} size="20" />
          </Group>
          <Address>{data.formatted_address}</Address>
        </Metadata>
      </Slider>
      <ActionBar />
      <Content>
        <Main>
          <Section>
            {canEdit() && <Link to={`/spot/edit/${data.spot_id}`}>edit</Link>}
            <Description>{data.description}</Description>
            <div>
              {data.type.map((type) => (
                <Type key={type}>{type}</Type>
              ))}
            </div>
          </Section>
          <Header>Popular Times</Header>
          <Section>
            <Time review={data.reviews} />
          </Section>
          <Header>Forecast</Header>
          <Section>
            <Forecast forecast={data.forecast} />
          </Section>
          <Header>Reviews</Header>
          <Section>
            <ReviewForm spot_id={data.spot_id} name={data.name} />
            <ReviewList reviews={data.reviews} />
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
          <SpotListWithData place_id={data.place_id} />
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
  flex: 0 0 300px;
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
