'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

// Features dotpoints
const features = [
  {
    id: 1,
    title: 'Based in Adelaide',
    text: '',
  },
  {
    id: 2,
    title: 'High quality ingredients',
    text: '',
  },
  {
    id: 3,
    title: 'Freshly baked for any occasion',
    text: '',
  },
  {
    id: 4,
    title: 'Home made & Made with love',
    text: '',
  },

]

export default function About() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading id="about" fontSize={'4xl'}>About Us</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
        Based in Adelaide, home made local baked goods for individuals and groups alike!
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
