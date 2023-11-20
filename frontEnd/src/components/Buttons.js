import React from 'react'
import { Button } from '@chakra-ui/react'

function Buttons({background, text}) {
  return (
    <Button
        role="button"
        backgroundColor={background}
        borderRadius="30px"
        color="white"
        border="none"
        p="32px"
        fontWeight="bold"
        fontSize="1rem"
        opacity={0.8}
        textAlign="center"
        cursor='pointer'
>
        {text}
    </Button>
  )
}

export default Buttons