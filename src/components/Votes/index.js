import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { voteSpotAction } from "../../reducers/spots";

const Votes = ({ spot_id, votes }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.data);

  const count = votes.reduce((acc, cur) => (cur.up ? acc + 1 : acc - 1), 0);
  const vote = user
    ? votes.find((vote) => vote.account_id === user.user_id)
    : null;

  const disableUp = vote ? vote.up : false;
  const disableDown = vote ? !vote.up : false;

  const handleVote = (up) => {
    if (user) {
      if (vote) {
        dispatch(voteSpotAction({ ...vote, up }));
      } else {
        dispatch(voteSpotAction({ spot_id, account_id: user.user_id, up }));
      }
    } else {
      history.push("/sign-in");
    }
  };

  return (
    <Container>
      <Button onClick={() => handleVote(true)} disabled={disableUp}>
        <FontAwesomeIcon icon={["far", "arrow-alt-up"]} />
      </Button>
      <Count>{count}</Count>
      <Button onClick={() => handleVote(false)} disabled={disableDown}>
        <FontAwesomeIcon icon={["far", "arrow-alt-down"]} />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  margin-right: 10px;
  text-align: center;
`;

const Button = styled.button`
  font-size: 18px;
  border: none;
  outline: none;
  background: none;
  color: #a0aec0;
  &:hover {
    cursor: pointer;
    color: #ed8936;
  }
  &:disabled {
    color: #ed8936;
  }
`;

const Count = styled.div`
  margin: 6px 0 10px 0;
  font-size: 18px;
  color: #2d3748;
`;

export default Votes;
