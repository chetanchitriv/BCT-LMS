import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <Box width={'100%'} pb={'4rem'} zIndex={'9999'}>
        <Box bg={'teal.700'} py={'1rem'} position={'fixed'} width={'100%'} color={'white'} top={0}>
          <Flex justifyContent={'space-between'}>
            <Box>
              <Text>Logo here</Text>
            </Box>
            <Box width={'20%'}>
              <Flex justifyContent={'center'} gap={'0.9rem'}>
                <Text>Create Class</Text>
                <Text>Login</Text>
                <Text>Sign-Up</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default Navbar
