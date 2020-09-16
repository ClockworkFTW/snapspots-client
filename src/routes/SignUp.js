import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

import { userSignUp } from "../reducers/user";

import Center from "../components/Center";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [email, setEmail] = useState("");

  const disabled = !username || !passwordOne || !passwordTwo || !email;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignUp({ username, passwordOne, passwordTwo, email }));
  };

  const { data, error } = useSelector((state) => state.user);

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
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button disabled={disabled} onClick={handleSubmit}>
            Sign Up
          </Button>
        </Form>
        <p>
          Already have an account? Sign in <Link to="/sign-in">here</Link>
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

export default SignUp;
