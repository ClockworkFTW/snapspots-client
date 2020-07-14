import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

import { userSignUp } from "../reducers/user";

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
    <Redirect to="/home" />
  ) : (
    <Wrapper>
      <Container>
        {error && <Error>{error}</Error>}
        <Form>
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
          />
          <Input
            type="password"
            placeholder="confirm password"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
          />
          <Input
            type="email"
            placeholder="email"
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.h1`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Input = styled.input``;

const Button = styled.button``;

export default SignUp;
