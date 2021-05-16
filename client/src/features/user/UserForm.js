import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Container,
  Flex,
  useToast
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, createUserAsync } from './userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export function UserForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const loading = useSelector(selectStatus) === 'loading';
  const toast = useToast()
  const dispatch = useDispatch();

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(createUserAsync({ email, firstName, lastName }));
      unwrapResult(resultAction);
      setEmail('');
      setFirstName('');
      setLastName('');
      toast({
        title: 'Account created.',
        description: 'We\'ve created your account for you.',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to create account.',
        description: err.message,
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" mt={6} color="gray.600" textAlign="center">
        Create user
      </Heading>
      <form noValidate onSubmit={onSubmit}>
        <FormControl mt={3} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            size="md"
            value={email}
            onChange={onEmailChanged}
          />
        </FormControl>
        <FormControl mt={3} isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            type="text"
            size="md"
            value={firstName}
            onChange={onFirstNameChanged}
          />
        </FormControl>
        <FormControl mt={3} isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            type="text"
            size="md"
            value={lastName}
            onChange={onLastNameChanged}
          />
        </FormControl>
        <Flex>
          <Button
            isLoading={loading}
            ml="auto"
            mt={4}
            type="submit"
            colorScheme="teal"
            spinnerPlacement="start"
          >
            Create
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
