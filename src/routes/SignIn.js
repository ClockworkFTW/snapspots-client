import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getUser } from "../services/users";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const user = await getUser({ username, password });
    console.log(user);
  };

  return (
    <Container>
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

const Input = styled.input``;

const Button = styled.button``;

export default SignIn;
