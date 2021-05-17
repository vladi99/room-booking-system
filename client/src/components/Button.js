import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
} from '@chakra-ui/react'

export function Button(props) {
  return <ChakraButton {...props} />
}

export function IconButton(props) {
  return <ChakraIconButton {...props} />
}
