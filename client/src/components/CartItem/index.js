import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

// Chakra components
import { FaTrashCan } from "react-icons/fa6";

import { 
  Button,
  Text,
  Container,
  Card,
  NumberInput,
  useNumberInput,
  HStack,
  Input,
  Stack,
  Box,
  Flex,
  useToast,
} from '@chakra-ui/react'

// =================================================================
// 
// Cart Sidebar Functions
// 
// =================================================================

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  // Chakra custom hooks

  const toast = useToast()

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: 0,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

// =================================================================
// 
// Render Cart contents
// 
// =================================================================

  return (
   
    <Container align='center' borderRadius={20}>
      <Card m='0.5rem' borderRadius={10}>
  
        <img
          src={`/images/${item.image}`}
          alt=""
        />
     
        <Text><strong>{item.name}:</strong> ${item.price}</Text>

        <NumberInput>
              <Text> Qty: </Text>
              <Input 
                type="number"
                placeholder="1"
                value={item.purchaseQuantity}
                onChange={onChange}
                textAlign='center'
              />

        </NumberInput>

        <Button 
          m='0.5rem' 
          onClick={() => { removeFromCart(item); toast({ 
            description: 'Removed from Cart!',
            // status: 'success',
            duration: 9000,
            isClosable: true,
            status: 'warning'
            });}} 
            variant='solid'
            bg='gray.300'
            >
          <FaTrashCan />
        </Button>
            
      </Card>
    </Container>
    
  );
}

export default CartItem;
