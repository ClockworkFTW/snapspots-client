import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { createSpotAction } from "../reducers/spot";

import { typeOptions, equipmentOptions, timeOptions } from "../config";

import { PickerMap } from "../components/Map";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import PhotoPicker from "../components/PhotoPicker";

const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { account_id } = useSelector((state) => state.user.data);
  const { error } = useSelector((state) => state.spots);

  const [spot, setSpot] = useState({
    custom: true,
    account_id,
    name: "",
    description: "",
    keywords: [],
    type: [],
    equipment: [],
    photos: [],
    latitude: "37.865101",
    longitude: "-119.538330",
  });

  const handleSubmit = () => dispatch(createSpotAction(spot, history));

  return (
    <Container>
      {error && <h1>something went wrong</h1>}
      <Row>
        <Group>
          <Header>Map</Header>
          <PickerMap width="100%" height="500px">
            <Search explore={true} />
          </PickerMap>
        </Group>
      </Row>
      <Row>
        <Group>
          <Header>Name</Header>
          <Input
            type="text"
            placeholder="E.g. 'Golden Gate Bridge'"
            value={spot.name}
            onChange={(e) => setSpot({ ...spot, name: e.target.value })}
          />
        </Group>
        <Group>
          <Header>Keywords</Header>
          <Input
            type="text"
            placeholder="E.g. landscape, coastal, rocks, sea"
            value={spot.keywords}
            onChange={(e) => setSpot({ ...spot, keywords: e.target.value })}
          />
        </Group>
      </Row>
      <Row>
        <Group>
          <Header>Type</Header>
          <Dropdown
            name="What type of spot is this?"
            options={typeOptions}
            value={spot.type}
            setValue={(value) => setSpot({ ...spot, type: value })}
          />
        </Group>
        <Group>
          <Header>Equipment</Header>
          <Dropdown
            name="What would you bring along?"
            options={equipmentOptions}
            value={spot.equipment}
            setValue={(value) => setSpot({ ...spot, equipment: value })}
          />
        </Group>
      </Row>
      <Row>
        <Group>
          <Header>Description</Header>
          <Textarea
            type="text"
            placeholder="Enter more information about this spot, anything you like."
            value={spot.description}
            onChange={(e) => setSpot({ ...spot, description: e.target.value })}
          />
        </Group>
      </Row>
      <Row>
        <Group>
          <Header>Photos</Header>
          <PhotoPicker
            photos={spot.photos}
            setPhotos={(value) => setSpot({ ...spot, photos: value })}
          />
        </Group>
      </Row>
      <Row>
        <Button onClick={handleSubmit}>Create Spot</Button>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 40px;
`;

const Group = styled.div`
  flex: 1;
  margin-right: 20px;
  &:nth-last-child(1) {
    margin-right: 0;
  }
`;

const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  &::placeholder {
    color: #a0aec0;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: none;
  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button``;

export default CreateSpot;
