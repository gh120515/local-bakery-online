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
  Box,
  Container,
  Stack,
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
    
      <Box bg={"brand.900"} color={"gray.50"} position="fixed" width="100%" mt="-5px" zIndex={3}>
        <Container
          position={"sticky"}
          as={Stack}
          maxW={'6xl'}
          // py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
            <Link to="/">
              <WrapItem mt="0.1rem">
                <Avatar name='icon' src='./images/icon.png' mt="0.4rem" ml="0.1rem"/>
                <Heading m="0.6rem" size="xl">
                  Su's Bakery
                </Heading>
              </WrapItem>
            </Link>
              <Stack direction={'row'} spacing={6}>
             
                {/* display Navbar options based on user login status */}
                  {showNavigation()}
           
              </Stack>
        </Container>
          
        </Box>
        


  );
}

export default Nav;
