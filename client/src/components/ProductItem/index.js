import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { FaCartPlus, FaHeartCirclePlus } from 'react-icons/fa6';

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
  HStack, 
  Divider,
  Container,
  Stack,
  ButtonGroup,
} from '@chakra-ui/react'

// =================================================================
// 
// Product Functions
// 
// =================================================================

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

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
    <Card maxW='sm'>
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
    <CardFooter>
      <ButtonGroup spacing='2' >
        <Button onClick={addToCart} variant='solid' colorScheme='green'>
        <FaCartPlus size='2rem'/>
        </Button>
        {/* <Button colorScheme='pink'><FaHeartCirclePlus size='2rem'/></Button> */}
      </ButtonGroup>
    </CardFooter>
        </Card>
  );
}

export default ProductItem;
