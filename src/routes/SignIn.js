import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getUser } from "../services/users";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const { token, error } = await getUser({ username, password });
    error ? setError(error) : console.log(token);
  };

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
      <Button onClick={handleSubmit}>Sign In</Button>
      <Link to="/sign-up">Sign Up</Link>
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

export default SignIn;
