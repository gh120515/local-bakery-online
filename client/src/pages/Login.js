import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

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
  useToast,
} from "@chakra-ui/react";

// =================================================================
// 
// Log In functions
// 
// =================================================================

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const [showPassword, setShowPassword] = useState(false)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const toast = useToast()

// =================================================================
// 
// Render Log In form
// 
// =================================================================

  return (
      <Flex pt={{ base: '150px',  md: '75px'} } 
      minH={'100vh'}
      // maxW={"100%"}
      // minW={'50%'}
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
            Log In
          </Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            for your ordering convinience
          </Text> */}
        </Stack>

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
              </HStack>
              <FormControl id="email">
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input 
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" >
                <FormLabel htmlFor="pwd">Password</FormLabel>
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
                  {error ? (
                        <div>
                          <p className="error-text">The provided credentials are incorrect</p>
                        </div>
                    ) : null}
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
                  Not yet a user? <Link to="/signup">Sign Up</Link>
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

export default Login;
