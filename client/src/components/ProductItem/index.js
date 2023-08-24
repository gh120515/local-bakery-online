import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { FaCartPlus, FaHeartCirclePlus } from 'react-icons/fa6';

// Chakra Components

import {
  Image,
  Button,
  Text,
  Card, 
  CardBody, 
  CardFooter, 
  Heading, 
  VStack, 
  Divider,
  Stack,
  ButtonGroup,
  useToast,
  Box,
  GridItem,
} from '@chakra-ui/react'

// =================================================================
// 
// Product Functions
// 
// =================================================================

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const toast = useToast()

  const {
    image,
    name,
    _id,
    price,
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

// =================================================================
// 
// Render Product Cards
// 
// =================================================================

  return (
    <GridItem>
    <VStack textAlign={'center'}>
      <Card maxW='sm' align={'center'}>
        <CardBody>
          <Link to={`/products/${_id}`}>
            <Image
              src={`/images/${image}`}
              alt={name}
              borderRadius='lg'
            />
          </Link>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{name}</Heading>
            {/* <Text>
              Text area
            </Text> */}
            <Text color='blue.600' fontSize='2xl'>
            ${price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter align={'center'}>
          {/* room for other buttons / functionalities */}
          <ButtonGroup spacing='2' >
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
            </Button>
            {/* <Button colorScheme='pink'><FaHeartCirclePlus size='2rem' /></Button> */}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </VStack>
    </GridItem>
  );
}

export default ProductItem;
