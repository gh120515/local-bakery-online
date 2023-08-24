import { 
    Stack, 
    Flex, 
    Button, 
    Text, 
    VStack, 
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { NavLink } from 'react-router-dom';
  import { HashLink } from 'react-router-hash-link';
  
  export default function LandingPage() {

    return (
      <Flex
        pt={{ base: '100px',  md: '10px'}}
        w={'full'}
        h={'100vh'}
        backgroundImage={
          'url(./images/su-bakery-web.png)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'right center'}>
        <VStack
          w={'full'}
          mt={'5rem'}
          justify={'top'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-t, blackAlpha.400, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              textShadow={"-1px -1px 0px #1C4532, 3px 3px 0px #000000, 6px 6px 0px #1C4532"}
              fontSize={useBreakpointValue({ base: '5xl', md: '6xl' })}>
              Welcome to Su's Bakery!
            </Text>
            <Stack direction={'row'}>
              <NavLink to="/catalogue">
                <Button
                  bg={'green.600'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'green.800' }}>
                  See our Catalogue
                </Button>
              </NavLink>
              <HashLink smooth to="/#about">
                <Button
                  bg={'green.400'}
                  rounded={'full'}
                  color={'white'}
                  _hover={{ bg: 'green.600' }}>
                  About Us
                </Button>
              </HashLink >
            </Stack>
          </Stack>
        </VStack>
  
      </Flex>
  
    )
  }