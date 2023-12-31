import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

import { Container } from "@chakra-ui/react";

const Catalogue = () => {
  return (
    // Add padding-top to take into responsive Navbar sizes
    <Container pt={{ base: '150px',  md: '75px'}}>
      <CategoryMenu  />
      <ProductList />
      <Cart />
    </Container>
  );
};

export default Catalogue;
