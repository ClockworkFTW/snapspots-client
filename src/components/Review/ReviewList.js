import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

import ProfileAvatar from "./ProfileAvatar";
import ReviewRating from "./ReviewRating";

const ReviewList = ({ reviews }) =>
  reviews.map(({ review_id, account_id, username, rating, comment, time }) => (
    <Container key={review_id}>
      <Header>
        <ProfileAvatar name={username} size="46" src={null} />
        <Metadata>
          <Name to={`/user/${account_id}`}>{username}</Name>
          <Group>
            <ReviewRating rating={rating} size="24" />
            <Time>{moment(time).format("MMMM Do, YYYY")}</Time>
          </Group>
        </Metadata>
      </Header>
      <Content>{comment}</Content>
    </Container>
  ));

const Container = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  &:nth-last-child(1) {
    border-bottom: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Metadata = styled.div`
  margin-left: 10px;
`;

const Name = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  font-weight: 700;
  color: #2d3748;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const Time = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #a0aec0;
`;

const Content = styled.p`
  line-height: 24px;
  color: #4a5568;
`;

export default ReviewList;
