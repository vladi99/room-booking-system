import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  Input as ChakraFormInput,
  FormErrorMessage as ChakraFormErrorMessage,
  Select as ChakraSelect
} from '@chakra-ui/react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { forwardRef } from 'react';

export function FormControl(props) {
  return <ChakraFormControl {...props}/>
}

export function FormLabel(props) {
  return <ChakraFormLabel {...props}/>
}

export function FormErrorMessage(props) {
  return <ChakraFormErrorMessage {...props}/>
}

export const Input = forwardRef((props, ref) => (
  <ChakraFormInput ref={ref} {...props}/>
));

export const Select = forwardRef((props, ref) => (
  <ChakraSelect ref={ref} {...props}/>
));

export const Autocomplete = forwardRef((props, ref) => (
  <CUIAutoComplete ref={ref} {...props}/>
));
