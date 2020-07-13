import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { userSignUp } from "../reducers/user";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const error = useSelector((state) => state.user.error);

  const handleSubmit = () =>
    dispatch(userSignUp({ username, password, email }));

  return (
    <Container>
      {error && <Error>{error}</Error>}
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit}>Sign Up</Button>
      <Link to="/sign-in">Sign In</Link>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Error = styled.h1`
  color: red;
`;

const Input = styled.input``;

const Button = styled.button``;

export default SignUp;
