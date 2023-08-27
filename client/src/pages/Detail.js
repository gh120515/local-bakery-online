import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

import { FaCartPlus, FaHeartCirclePlus } from 'react-icons/fa6';

// Chakra components

import {
  Heading,
  Container,
  useDisclosure,
  Button,
  ButtonGroup,
  Text,
  useToast,
  VStack,
  Card,
  CardBody,
} from '@chakra-ui/react'

// =================================================================
// 
// Product Detail Page Functions
// 
// =================================================================

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  // const removeFromCart = () => {
  //   dispatch({
  //     type: REMOVE_FROM_CART,
  //     _id: currentProduct._id,
  //   });

  //   idbPromise('cart', 'delete', { ...currentProduct });
  // };

  // Chakra functions
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

// =================================================================
// 
// Render individual Product
// 
// =================================================================

  return (
    
    <Container pt={{ base: '160px',  md: '80px'}} align={'center'}>
      <Card align={'center'} mb='2'>
      <CardBody >
      {currentProduct && cart ? (
        
          <>
          <Button bg='green.200' >
            <Link to="/catalogue" >← Back to Products</Link>
          </Button>
        
          <Heading>{currentProduct.name}</Heading>
          <Text>{currentProduct.description}</Text>

          <Heading size='lg'>Ingredients</Heading>
          <Text>{currentProduct.ingredients}</Text>

          <Heading size='md' fontWeight={'bold'}>Price: </Heading>
          <Text color='blue.600' fontSize='2xl'>
          ${currentProduct.price}{' '}
            </Text>
          <>

          <VStack>
          <ButtonGroup spacing='2' m='1rem' >
            <Button onClick={() => { addToCart(); toast({ 
              description: 'Added to Cart!',
              // status: 'success',
              duration: 9000,
              isClosable: true,
              });}} 
              variant='solid'
              colorScheme='green'
              >
            <FaCartPlus size='2rem'/>
            <Text>Add to Cart</Text>
            </Button>
            {/* <Button colorScheme='pink'><FaHeartCirclePlus size='2rem' /></Button> */}
          </ButtonGroup>
          </VStack>

          </>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
      </CardBody>
      </Card>
    </Container>

  );
}

export default Detail;
