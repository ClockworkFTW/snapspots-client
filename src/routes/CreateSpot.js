import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

// prettier-ignore
import { initSpotAction, setSpotAction, getSpotAction, createSpotAction} from "../reducers/spot";

import { typeOptions, equipmentOptions } from "../config";

import { PickerMap } from "../components/Map";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import PhotoPicker from "../components/PhotoPicker";

const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { spot_id } = useParams();
  const { pending, data, error } = useSelector((state) => state.spot);

  const editing = spot_id !== "new";

  useEffect(() => {
    if (editing) {
      if (data) {
        if (spot_id !== data.spot_id) {
          dispatch(getSpotAction(spot_id));
        }
      } else {
        dispatch(getSpotAction(spot_id));
      }
    } else {
      dispatch(initSpotAction());
    }
  }, [spot_id]);

  const { account_id } = useSelector((state) => state.user.data);
  const { cLat, cLng } = useSelector((state) => state.map);

  const handleSubmit = () => {
    const spot = {
      custom: true,
      account_id,
      ...data,
      latitude: cLat,
      longitude: cLng,
    };

    if (editing) {
      dispatch(createSpotAction(spot, history));
    } else {
      dispatch(createSpotAction(spot, history));
    }
  };

  return (
    data && (
      <Container>
        {error && <h1>something went wrong</h1>}
        <PickerMap editing={editing} height="500px">
          <Search explore={true} />
        </PickerMap>
        <Form>
          <Row>
            <Group>
              <Header>Name</Header>
              <Input
                type="text"
                placeholder="E.g. 'Golden Gate Bridge'"
                value={data.name}
                onChange={(e) =>
                  dispatch(setSpotAction({ name: e.target.value }))
                }
              />
            </Group>
            <Group>
              <Header>Keywords</Header>
              <Input
                type="text"
                placeholder="E.g. landscape, coastal, rocks, sea"
                value={data.keywords}
                onChange={(e) =>
                  dispatch(setSpotAction({ keywords: e.target.value }))
                }
              />
            </Group>
          </Row>
          <Row>
            <Group>
              <Header>Type</Header>
              <Dropdown
                name="What type of spot is this?"
                options={typeOptions}
                value={data.type}
                setValue={(value) => dispatch(setSpotAction({ type: value }))}
              />
            </Group>
            <Group>
              <Header>Equipment</Header>
              <Dropdown
                name="What would you bring along?"
                options={equipmentOptions}
                value={data.equipment}
                setValue={(value) =>
                  dispatch(setSpotAction({ equipment: value }))
                }
              />
            </Group>
          </Row>
          <Row>
            <Group>
              <Header>Description</Header>
              <Textarea
                type="text"
                placeholder="Enter more information about this spot, anything you like."
                value={data.description}
                onChange={(e) =>
                  dispatch(setSpotAction({ description: e.target.value }))
                }
              />
            </Group>
          </Row>
          <Row>
            <Group>
              <Header>Photos</Header>
              <PhotoPicker
                photos={data.photos}
                setPhotos={(value) =>
                  dispatch(setSpotAction({ photos: value }))
                }
              />
            </Group>
          </Row>
          <Row>
            <Button onClick={handleSubmit}>
              {editing ? "Update Spot" : "Create Spot"}
            </Button>
          </Row>
        </Form>
      </Container>
    )
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  border-radius: 8px;
  overflow: hidden;
`;

const Form = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
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
