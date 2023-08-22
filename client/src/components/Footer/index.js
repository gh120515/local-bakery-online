import {
  Box,
  Link,
  Container,
  Stack,
  Text,
  // useColorModeValue,
} from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa6'
import Moment from 'react-moment';
import moment from 'moment';

export default function Footer() {
  const start = moment();

  return (
    <Box
      bg={"brand.900"}
      color={"gray.50"} >
      <Container
        position={"sticky"}
        bottom={'0'}
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© <Moment date={start} format="YYYY"></Moment> Su's Bakery. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <Link label={'Instagram'} fontSize="2rem" href={'#'}>
            <FaInstagram />
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}
