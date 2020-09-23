import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

import ProfileAvatar from "./ProfileAvatar";

const ProfileTag = ({ spot }) => {
  // prettier-ignore
  const {account: { account_id, username }, custom, created_on} = spot;

  return (
    <Wrapper to={`/profile/${account_id}`}>
      <Container>
        <ProfileAvatar name={username} size="46" src={null} />
        <ProfileMetadata>
          <CreatedBy>
            {custom ? "Created" : "Discovered"} by{" "}
            <span style={{ fontWeight: "700" }}>{username}</span>
          </CreatedBy>
          <CreatedOn>{moment(created_on).format("MMM DD, YYYY")}</CreatedOn>
        </ProfileMetadata>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileMetadata = styled.div`
  margin-left: 10px;
`;

const CreatedBy = styled.h1`
  margin-bottom: 6px;
  color: #2d3748;
`;

const CreatedOn = styled.h3`
  font-size: 14px;
  color: #a0aec0;
`;

export default ProfileTag;
