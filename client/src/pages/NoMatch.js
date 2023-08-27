import React from "react";
import Jumbotron from "../components/Jumbotron";

import { Container } from "@chakra-ui/react";

const NoMatch = () => {
  return (
    <Container pt={{ base: '150px',  md: '75px'}}>
      <Jumbotron>
        <h1>404 Page Not Found</h1>
      </Jumbotron>
    </Container>
  );
};

export default NoMatch;
