import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

// Chakra components
import { 
  CloseButton,
  Heading,
  Button,
  Text,
  Container,
  Card,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';

// cart icon
import { FaCartShopping } from "react-icons/fa6";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          <FaCartShopping className='shoppingCart' />
        </span>
      </div>
    );
  }

  return (

      <div className='cart' align='center'>
        <CloseButton className='cart-close-button' onClick={toggleCart} align="end"/>
        <Heading textAlign={'center'}>Shopping Cart</Heading>
        
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div m='5px'>
            <Text size='md'as='b'>Total: ${calculateTotal()}  </Text>

            {Auth.loggedIn() ? (
              <Button onClick={submitCheckout} colorScheme='green'>Checkout</Button>
            ) : (
              <Button>(log in to check out)</Button>
            )}
          </div>
        </div>
      ) : (
        <h3>
          You haven't added anything to your cart yet!
        </h3>
      )}
      </div>

  );
};

export default Cart;
