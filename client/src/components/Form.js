import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  Input as ChakraFormInput,
  FormErrorMessage as ChakraFormErrorMessage,
  Select as ChakraSelect,
} from '@chakra-ui/react'
import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

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

export const DatePicker = forwardRef((props, ref) => {
  return (
    <ReactDatePicker
      ref={ref}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      customInput={<Input/>}
      {...props}
    />
  );
});

