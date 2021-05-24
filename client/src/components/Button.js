import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
} from '@chakra-ui/react'
import React, { forwardRef } from 'react';

export const Button = forwardRef((props, ref) => (
  <ChakraButton ref={ref} {...props}/>
));

export function IconButton(props) {
  return <ChakraIconButton {...props} />
}
