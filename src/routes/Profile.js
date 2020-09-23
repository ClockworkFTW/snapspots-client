import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getProfileAction } from "../reducers/profile";

import Loader from "../components/Loader";
import { ProfileAvatar } from "../components/Profile";

const Profile = () => {
  const dispatch = useDispatch();
  const { user_id } = useParams();

  const { pending, data, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (data) {
      if (Number(user_id) !== Number(data.user_id)) {
        dispatch(getProfileAction(user_id));
      }
    } else {
      dispatch(getProfileAction(user_id));
    }
  }, [user_id]);

  return pending ? (
    <Loader />
  ) : (
    data && (
      <Wrapper>
        <Container>
          <ProfileAvatar name={data.username} size="80" />
          <h1>{data.username}</h1>
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

const Container = styled.div`
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
`;

export default Profile;
