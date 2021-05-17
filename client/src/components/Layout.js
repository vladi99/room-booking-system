import {
  Box as ChakraBox,
  Container as ChakraContainer,
  Flex as ChakraFlex,
  Stack as ChakraStack,
  Grid as ChakraGrid,
  GridItem as ChakraGridItem
} from '@chakra-ui/react';

export function Box(props) {
  return <ChakraBox {...props}/>
}

export function Container(props) {
  return <ChakraContainer {...props}/>
}

export function Flex(props) {
  return <ChakraFlex {...props}/>
}

export function Stack(props) {
  return <ChakraStack {...props}/>
}

export function Grid(props) {
  return <ChakraGrid {...props}/>
}

export function GridItem(props) {
  return <ChakraGridItem {...props}/>
}
