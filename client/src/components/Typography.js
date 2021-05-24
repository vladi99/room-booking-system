import {
  Heading as ChakraHeading,
  Text as ChakraText,
} from '@chakra-ui/react'

export function Heading(props) {
  return <ChakraHeading {...props}/>
}

export function Text(props) {
  return <ChakraText {...props}/>
}
