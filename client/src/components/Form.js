import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  Input as ChakraFormInput
} from '@chakra-ui/react'

export function FormControl(props) {
  return <ChakraFormControl {...props}>{props.children}</ChakraFormControl>
}

export function FormLabel(props) {
  return <ChakraFormLabel {...props}>{props.children}</ChakraFormLabel>
}

export function Input(props) {
  return <ChakraFormInput {...props}>{props.children}</ChakraFormInput>
}
