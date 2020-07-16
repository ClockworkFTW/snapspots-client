import React, { useState } from "react";
import styled from "styled-components";

import Dropdown from "../components/Dropdown";
import PhotoPicker from "../components/PhotoPicker";

const typeOptions = [
  "Sunset/Sunrise",
  "Landscape",
  "Nature",
  "Water/Coastal",
  "Wildlife/Animals",
  "People/Portraits",
  "Architecture",
  "City/Urban",
  "Astrophotography",
  "Panoramic",
  "Transport (Cars,Trains)",
  "Weddings",
  "Abandoned",
];

const equipmentOptions = [
  "Tripod",
  "Shutter Release Cable",
  "Filters",
  "Cleaning Equipment",
  "Rain Cover",
  "Flash/speedlight",
  "Flash Radio Triggers",
  "Light Modifiers",
  "Wide Angle Lens",
  "Telephoto Lens",
  "Prime Lens",
  "Macro Lens",
  "An Assistant",
];

const timeOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const examplePhotos = [
  "https://images.unsplash.com/photo-1594643550894-a64bbe3f5dfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1594663216948-e8bbbd26d733?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2516&q=80",
  "https://images.unsplash.com/photo-1594682138028-6b95651d8c2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80",
  "https://images.unsplash.com/photo-1594672011116-298182da5f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80",
  "https://images.unsplash.com/photo-1594401477753-d92b74a95340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80",
  "https://images.unsplash.com/photo-1594671551002-83d49b4c70ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80",
  "https://images.unsplash.com/photo-1594502645146-919ab24010e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3582&q=80",
  "https://images.unsplash.com/photo-1594653804668-2d0d80888fe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80",
];

const dropdownStyle = {
  display: "inline-block",
  width: "calc(33.33% - 20px)",
  marginRight: "20px",
  verticalAlign: "top",
};

const CreateSpot = () => {
  const [name, setName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [type, setType] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [time, setTime] = useState([]);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSubmit = () => {
    const spot = { name, keywords, type, equipment, time, description, photos };
    console.log(spot);
  };

  return (
    <Container>
      <Column>
        <Group>
          <Header>Map</Header>
          <Map />
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

const Map = styled.div`
  width: 500px;
  height: 500px;
  background: #e2e8f0;
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
