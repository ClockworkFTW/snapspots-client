import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ReviewRating = ({ reviews, rating, setRating, size }) => {
  const [hover, setHover] = useState(null);

  const avgRating = reviews
    ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
    : null;

  return (
    <Wrapper>
      <Container>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <Star key={i}>
              <Input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => (setRating ? setRating(ratingValue) : null)}
              />
              <Icon
                icon={["fas", "star"]}
                size={size}
                filled={ratingValue <= (hover || rating || avgRating)}
                cursor={setRating ? "pointer" : "inherit"}
                onMouseEnter={() => (setRating ? setHover(ratingValue) : null)}
                onMouseLeave={() => (setRating ? setHover(null) : null)}
              />
            </Star>
          );
        })}
      </Container>
      {reviews && <Count size={size}>({reviews.length})</Count>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div``;

const Star = styled.label``;

const Input = styled.input`
  display: none;
`;

const Icon = styled(FontAwesomeIcon)`
  padding: ${({ size }) => `${size * 0.2}px ${size * 0.1}px`};
  font-size: ${({ size }) => `${size}px`};
  color: ${({ filled }) => (filled ? "#f4d24c" : "#e6e6e6")};
  &:hover {
    cursor: ${({ cursor }) => cursor};
  }
`;

const Count = styled.span`
  margin-left: 10px;
  font-size: ${(props) => `${props.size * 0.7}px`};
  color: #cbd5e0;
`;

export default ReviewRating;
