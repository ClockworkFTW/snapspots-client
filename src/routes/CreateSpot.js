import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { createSpotAction } from "../reducers/spots";

import { typeOptions, equipmentOptions, timeOptions } from "../config";

import Map from "../components/Map";
import Dropdown from "../components/Dropdown";
import PhotoPicker from "../components/PhotoPicker";

const dropdownStyle = {
  display: "inline-block",
  width: "calc(33.33% - 20px)",
  marginRight: "20px",
  verticalAlign: "top",
};

const CreateSpot = () => {
  const [coords, setCoords] = useState(null);
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [time, setTime] = useState([]);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const spot = {
      coords,
      name,
      keywords,
      type,
      equipment,
      time,
      description,
      photos,
    };

    dispatch(createSpotAction(spot));
  };

  return (
    <Container>
      <Column>
        <Group>
          <Header>Map</Header>
          <Map coords={coords} width="500px" height="500px" zoom="0" />
        </Group>
      </Column>
      <Column style={{ flex: 1, marginLeft: "20px" }}>
        <Row>
          <Group>
            <Header>Name</Header>
            <Input
              type="text"
              placeholder="E.g. 'Golden Gate Bridge'"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Group>
          <Group>
            <Header>Keywords</Header>
            <Input
              type="text"
              placeholder="E.g. landscape, coastal, rocks, sea"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </Group>
        </Row>
        <Row>
          <Group>
            <Header>Info</Header>
            <Dropdown
              name="Spot Type"
              options={typeOptions}
              value={type}
              setValue={setType}
              style={dropdownStyle}
            />
            <Dropdown
              name="Recommended Equipment"
              options={equipmentOptions}
              value={equipment}
              setValue={setEquipment}
              style={dropdownStyle}
            />
            <Dropdown
              name="Best time to visit"
              options={timeOptions}
              value={time}
              setValue={setTime}
              style={dropdownStyle}
            />
          </Group>
        </Row>
        <Row>
          <Group>
            <Header>Description</Header>
            <Textarea
              type="text"
              placeholder="Enter more information about this spot, anything you like."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Group>
        </Row>
        <Row>
          <Group>
            <Header>Photos</Header>
            <PhotoPicker photos={photos} setPhotos={setPhotos} />
          </Group>
        </Row>
        <Row>
          <Button onClick={handleSubmit}>Create Spot</Button>
        </Row>
      </Column>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
`;

const Column = styled.div``;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 40px;
`;

const Group = styled.div`
  flex: 1;
  margin-right: 20px;
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
