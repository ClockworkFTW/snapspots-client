import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

import { userSignIn } from "../reducers/user";

const SignIn = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const disabled = !username || !password;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignIn({ username, password }));
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

const Container = styled.div``;

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

export default SignIn;
