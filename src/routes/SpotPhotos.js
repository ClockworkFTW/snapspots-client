import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getSpotAction } from "../reducers/spot";

import Loader from "../components/Loader";
import { SpotStatus } from "../components/Spots";
import { ReviewRating } from "../components/Review";
import PhotoGallery from "../components/PhotoGallery";
import PhotoModal from "../components/PhotoModal";

const SpotPhotos = () => {
  const dispatch = useDispatch();
  const { spot_id } = useParams();

  const { pending, data, error } = useSelector((state) => state.spot);

  useEffect(() => {
    if (data) {
      if (Number(spot_id) !== Number(data.spot_id)) {
        dispatch(getSpotAction(spot_id));
      }
    } else {
      dispatch(getSpotAction(spot_id));
    }
  }, [spot_id]);

  const [photoIndex, setPhotoIndex] = useState(null);

  const handleSelect = (targetPhoto) => {
    console.log(targetPhoto);
    setPhotoIndex(data.photos.findIndex((photo) => photo === targetPhoto) + 1);
  };

  return pending ? (
    <Loader />
  ) : (
    data && (
      <>
        <Wrapper>
          <Container>
            <Header>
              <Title>{data.name}</Title>
              <Area>{data.area}</Area>
              <Group>
                <SpotStatus
                  spot_id={data.spot_id}
                  account_id={data.account_id}
                />
                <ReviewRating reviews={data.reviews} size="20" />
              </Group>
            </Header>
            <PhotoGallery
              photos={data.photos}
              name={data.name}
              onClick={handleSelect}
              cols="3"
            />
          </Container>
        </Wrapper>
        {photoIndex && (
          <PhotoModal
            photos={data.photos}
            photoIndex={photoIndex}
            setPhotoIndex={setPhotoIndex}
          />
        )}
      </>
    )
  );
};

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 90px 20px;
`;

const Container = styled.div`
  padding: 26px;
  background: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
`;

const Header = styled.div`
  margin-bottom: 26px;
`;

const Title = styled.h1`
  white-space: nowrap;
  font-size: 22px;
  font-weight: 900;
  color: #2d3748;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Area = styled.h3`
  margin: 8px 0;
  white-space: nowrap;
  font-size: 14px;
  color: #a0aec0;
`;

export default SpotPhotos;
