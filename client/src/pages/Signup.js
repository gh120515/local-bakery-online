import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

// Chakra components
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { 
  Heading,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// =================================================================
// 
// Sign Up functions
// 
// =================================================================

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const [showPassword, setShowPassword] = useState(false)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

// =================================================================
// 
// Render Sign Up form
// 
// =================================================================

  return (
    
      <Flex pt={{ base: '150px',  md: '75px'}} 
      minH={'100vh'}
      width={"100"}
      align={'center'}
      justify={'center'}
      >
      <form onSubmit={handleFormSubmit} style={{ width: '100%'}}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

{/* =================================================================

Form Components (Start)

================================================================= */}

        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            for your ordering convinience
          </Text>
        </Stack>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="First"
                      name="firstName"
                      type="firstName"
                      id="firstName"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                      placeholder="Last"
                      name="lastName"
                      type="lastName"
                      id="lastName"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input 
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                    // placeholder="**********"
                    name="password"
                    id="pwd"
                    onChange={handleChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'green.500'}
                  color={'white'}
                  _hover={{
                    bg: 'green.700',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to="/login">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        
      </Stack>
{/* =================================================================

Form Components (End)

================================================================= */}
    </form>
    </Flex>
    
  );
}

export default Signup;
