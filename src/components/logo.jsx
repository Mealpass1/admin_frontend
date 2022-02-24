import * as React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <Container>
      <img src="/logo.svg" alt="Meal" />
    </Container>
  );
};

const Container = styled.div`
  width: 10em;
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 50%;
  padding: 1em;
  background: var(--bright);

  img {
    width: 80%;
  }
`;

export default Logo;
