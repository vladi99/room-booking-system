import {
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
} from '@chakra-ui/react'

export function Table(props) {
  return <ChakraTable {...props}/>
}

export function Tbody(props) {
  return <ChakraTbody {...props}/>
}

export function Thead(props) {
  return <ChakraThead {...props}/>
}

export function Tr(props) {
  return <ChakraTr {...props}/>
}

export function Th(props) {
  return <ChakraTh {...props}/>
}

export function Td(props) {
  return <ChakraTd {...props}/>
}
