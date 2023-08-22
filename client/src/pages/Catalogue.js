import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

import { Container, Spacer } from "@chakra-ui/react";

const Catalogue = () => {
  return (
    // Add padding to take into responsive Navbar sizes
    <Container pt={{ base: '140px',  md: '60px'}}>
      <CategoryMenu  />
      <ProductList />
      <Cart />
    </Container>
  );
};

export default Catalogue;
