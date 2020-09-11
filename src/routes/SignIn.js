import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

import { userSignIn } from "../reducers/user";

import Center from "../components/Center";

const SignIn = () => {
  const dispatch = useDispatch();

  const { data, error } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const disabled = !username || !password;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignIn({ username, password }));
  };

  return data ? (
    <Redirect to="/spot/explore" />
  ) : (
    <Center>
      <Container>
        {error && <Error>{error}</Error>}
        <Form>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={disabled} onClick={handleSubmit}>
            Sign In
          </Button>
        </Form>
        <p>
          Don't have an account yet? Sign up <Link to="/sign-up">here</Link>
        </p>
      </Container>
    </Center>
  );
};

const Container = styled.div`
  padding: 30px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
`;

const Error = styled.h1`
  color: red;
`;

const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  padding: 10px 0;
  background: #ed8936;
  border: none;
  outline: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  &:hover {
    opacity: 0.7;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export default SignIn;
