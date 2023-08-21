import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

import { 
  Avatar, 
  WrapItem,
  Heading,
  Tabs,
  TabList,
  Tab,  
  Flex,
  Box,
  Spacer,
} from '@chakra-ui/react'

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Tabs isFitted align='end' variant='soft-rounded' colorScheme='green' mr="1rem" mt="0.75rem">
          <TabList mb='1em'>
            <Link to="/catalogue">
              <Tab _selected={{ color: 'black', bg: 'green.100', fontWeight: 'bold' }}>Catalogue</Tab>
            </Link>  
            <Link to="/orderHistory">
              <Tab _selected={{ color: 'black', bg: 'green.100', fontWeight: 'bold' }}>Order History</Tab>
            </Link>
            <Link to="/" onClick={() => Auth.logout()}>
              <Tab _selected={{ color: 'black', bg: 'green.100', fontWeight: 'bold' }}>Log Out</Tab>
            </Link>
          </TabList>
        </Tabs>
      );
    } else {
      return (

        <Tabs isFitted align='end' variant='soft-rounded' colorScheme='green' mr="1rem" mt="0.75rem">
          <TabList mb='1em'>
            <Link to="/catalogue">
              <Tab _selected={{ color: 'black', bg: 'green.100', fontWeight: 'bold' }}>Catalogue</Tab>
            </Link>  
            <Link to="/signup">
              <Tab _selected={{ color: 'black', bg: 'green.100', fontWeight: 'bold' }}>Sign Up</Tab>
            </Link>
            <Link to="/login">
              <Tab _selected={{ color: 'black', bg: 'green.100', fontWeight: 'bold' }}>Log In</Tab>
            </Link>
          </TabList>
        </Tabs>
      );
    }
  }

  return (
    <Flex minWidth='max-content' alignItems='center' gap='2' bg="brand.900" color="gray.50">
      <Box p='2'>
          <Link to="/">
            <WrapItem>
              <Avatar name='icon' src='./images/icon.png' mt="0.4rem" ml="0.1rem"/>
              <Heading m="0.6rem" size="xl">
                Su's Bakery
              </Heading>
          </WrapItem>
          </Link>
        </Box>
        <Spacer />
      <nav>
        {showNavigation()}
      </nav>
    </Flex>

  );
}

export default Nav;
