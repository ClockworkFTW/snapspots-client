import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import ProfileAvatar from "./ProfileAvatar";

const ProfileButton = ({ user }) => (
  <Container to={`/profile/${user.account_id}`}>
    <ProfileAvatar name={user.username} size="36" />
    <Username>{user.username}</Username>
  </Container>
);

const Container = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 20px;
  text-decoration: none;
`;

const Username = styled.h1`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #2d3748;
`;

export default ProfileButton;
