import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

import { 
  Container,
  Heading,
 } from "@chakra-ui/react";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <Container>
      <Jumbotron>
        <Heading size='4xl'>Success!</Heading>
        <Heading size='xl'>Thank you for your purchase!</Heading>
        <Heading size='md'>You will now be redirected to the home page</Heading>
      </Jumbotron>
    </Container>
  );
}

export default Success;
