import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ActionBar = ({ spot }) => {
  const user = useSelector((state) => state.user.data);

  const canEdit = () => {
    if (user) {
      if (spot.custom) {
        return user.account_id === spot.account_id;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const directionsLink = `https://www.google.com/maps/dir/Current+Location/${spot.latitude},${spot.longitude}`;

  return (
    <Container>
      <SectionLink to={`/spot/photos/${spot.spot_id}`}>
        <Logo>
          <Icon icon={["far", "camera"]} />
        </Logo>
        <Text>Photos</Text>
      </SectionLink>
      <SectionLink to="/spot/explore">
        <Logo>
          <Icon icon={["far", "map-marked"]} />
        </Logo>
        <Text>Nearby</Text>
      </SectionLink>
      <SectionAnchor href={directionsLink} target="_blank">
        <Logo>
          <Icon icon={["far", "location-arrow"]} />
        </Logo>
        <Text>Directions</Text>
      </SectionAnchor>
      <SectionButton>
        <Logo>
          <Icon icon={["far", "inbox-out"]} />
        </Logo>
        <Text>Share</Text>
      </SectionButton>
      {canEdit() && (
        <SectionLink to={`/spot/edit/${spot.spot_id}`}>
          <Logo>
            <Icon icon={["far", "pencil"]} />
          </Logo>
          <Text>Edit</Text>
        </SectionLink>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
`;

const SectionLink = styled(Link)`
  position: relative;
  flex: 1;
  padding-top: 24px;
  text-align: center;
  text-decoration: none;
  background: #ed8936;
  &:hover {
    cursor: pointer;
    background: #f6ad55;
  }
`;

const SectionAnchor = styled.a`
  position: relative;
  flex: 1;
  padding-top: 24px;
  text-align: center;
  text-decoration: none;
  background: #ed8936;
  &:hover {
    cursor: pointer;
    background: #f6ad55;
  }
`;

const SectionButton = styled.div`
  position: relative;
  flex: 1;
  padding-top: 24px;
  text-align: center;
  text-decoration: none;
  background: #ed8936;
  &:hover {
    cursor: pointer;
    background: #f6ad55;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.4);
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: #ed8936;
`;

const Text = styled.h1`
  padding: 8px 0;
  color: #ffffff;
`;

export default ActionBar;
