import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as L, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  initSpotAction,
  setSpotAction,
  getSpotAction,
  createSpotAction,
  updateSpotAction,
} from "../reducers/spot";

import { typeOptions, equipmentOptions } from "../config";

import { PickerMap } from "../components/Map";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import PhotoPicker from "../components/PhotoPicker";

const CreateSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { spot_id } = useParams();
  const editing = spot_id !== "new";

  const { pending, data, error } = useSelector((state) => state.spot);

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
    const spot = { custom: true, account_id, ...data };

    if (editing) {
      dispatch(updateSpotAction(spot, history));
    } else {
      dispatch(createSpotAction(spot, history));
    }
  };

  return (
    data && (
      <Wrapper>
        {error && (
          <Error>
            Something went wrong... please make sure all fields are filled out
            below.
          </Error>
        )}
        <PickerMap editing={editing} height="500px">
          <Search />
        </PickerMap>
        <Container>
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
            <Group>
              <Button onClick={handleSubmit} fill={true}>
                {editing ? "Update Spot" : "Create Spot"}
              </Button>
            </Group>
            <Group>
              <Button onClick={() => history.goBack()}>Cancel</Button>
            </Group>
          </Row>
        </Container>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 90px 20px;
`;

const Error = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  border: 2px solid #f56565;
  color: #f56565;
`;

const Container = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
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

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  text-decoration: none;
  color: ${({ fill }) => (fill ? "#ffffff" : "#ED8936")};
  background: ${({ fill }) => (fill ? "#ED8936" : "#ffffff")};
  border: 2px solid #ed8936;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default CreateSpot;
