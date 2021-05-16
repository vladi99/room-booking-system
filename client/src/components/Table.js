import {
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  TableCaption  as ChakraTableCaption,
} from '@chakra-ui/react'

export function Table(props) {
  return <ChakraTable {...props}>{props.children}</ChakraTable>
}

export function Tbody(props) {
  return <ChakraTbody>{props.children}</ChakraTbody>
}

export function Thead(props) {
  return <ChakraThead>{props.children}</ChakraThead>
}

export function Tr(props) {
  return <ChakraTr>{props.children}</ChakraTr>
}

export function Th(props) {
  return <ChakraTh>{props.children}</ChakraTh>
}

export function Td(props) {
  return <ChakraTd>{props.children}</ChakraTd>
}

export function TableCaption(props) {
  return <ChakraTableCaption {...props}>{props.children}</ChakraTableCaption>
}

