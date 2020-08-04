import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ReviewRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <Wrapper>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <Container key={i}>
            <Input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => (setRating ? setRating(ratingValue) : null)}
            />
            <Icon
              icon={["far", "star"]}
              color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
              cursor={setRating ? "pointer" : "inherit"}
              onMouseEnter={() => (setRating ? setHover(ratingValue) : null)}
              onMouseLeave={() => (setRating ? setHover(null) : null)}
            />
          </Container>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.label``;

const Input = styled.input`
  display: none;
`;

const Icon = styled(FontAwesomeIcon)`
  padding: 4px;
  font-size: 30px;
  color: ${(props) => props.color};
  &:hover {
    cursor: ${(props) => props.cursor};
  }
`;

export default ReviewRating;
