import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

// Chakra Components

import {
  Heading,
  Image,
  Button,
  Text,
  Card, 
  CardBody, 
  CardFooter, 
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
// Category Functions
// 
// =================================================================

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

// =================================================================
// 
// Render Categories
// 
// =================================================================

  return (
    <div>
      <Heading>Choose a Category:</Heading>
      {categories.map((item) => (
        <Button
          margin='0.2rem'
          variant='solid'
          colorScheme='green'
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default CategoryMenu;
