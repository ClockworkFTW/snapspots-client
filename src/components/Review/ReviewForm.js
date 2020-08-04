import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { reviewSpotAction } from "../../reducers/spots";

import ReviewRating from "./ReviewRating";

const ReviewForm = ({ spot_id, name }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const toggle = () => setShowForm(!showForm);

  const handleSubmit = () => {
    if (user) {
      const { account_id } = user;
      const review = { spot_id, account_id, rating, comment };
      dispatch(reviewSpotAction(review));
      toggle();
    }
  };

  return (
    <Container>
      {!showForm && <Button onClick={toggle}>Write Review</Button>}
      {showForm && (
        <Form>
          <Header>How was {name}?</Header>
          <ReviewRating rating={rating} setRating={setRating} />
          <TextArea
            placeholder="Share your thoughts on this spot so others know what to expect."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleSubmit}>submit</Button>
          <Button onClick={toggle}>cancel</Button>
        </Form>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 40px 0;
`;

const Form = styled.div``;

const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  margin: 10px 0;
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

export default ReviewForm;
