import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

import { Outlet } from "react-router-dom"

// Chakra Components

import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  SimpleGrid,
  Button,
  Text,
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Heading, 
  VStack, 
  Divider,
  Container,
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react'

// =================================================================
// 
// Display Product Functions
// 
// =================================================================

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  const filterProducts = () => {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

// =================================================================
// 
// Render Products
// 
// =================================================================

  return (

    <Box p={4}>
      <Heading textAlign={'center'}>Our Products:</Heading>

      <Container maxW={'6xl'} mt={10}>
      <VStack textAlign={'center'}>
      
      {state.products.length ? (
        <SimpleGrid 
        spacing={10}
        minChildWidth={300}
        bg={'green.50'}
        columns={{ base: 1, md: 2, lg: 4 }}
        >
          {filterProducts && filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              ingredients={product.ingredients}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Heading size='md'>You haven't added any products yet!</Heading>
      )}
      
      {loading ? <img src={spinner} alt="loading" /> : null}
      
      </VStack>
      </Container>
      </Box>
  );
}

export default ProductList;
