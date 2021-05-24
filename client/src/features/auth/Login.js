import React from 'react';
import {
  Container,
  useToast, FormControl, FormLabel, Input, FormErrorMessage, Flex, Button,
} from '../../components';
import { useDispatch } from 'react-redux';
import { loginAsync } from './authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { setServerErrors } from '../../utils/setServerErrors';

export function Login() {
  const toast = useToast()
  const dispatch = useDispatch();
  const { register, setError, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginAsync(data));
      unwrapResult(resultAction);
      reset();
      toast({
        title: 'Successfully logged in.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError)
      toast({
        title: 'Failed to login.',
        status: 'error',
      })
    }
  };

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Container maxW="md">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={3} isRequired isInvalid={errors?.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register('email', { required: true })}
            />
            {errors?.email?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
            {errors?.email?.type === 'server' && <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>}
          </FormControl>
          <FormControl mb={3} isRequired isInvalid={errors?.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              name="password"
              type="password"
              {...register('password', { required: true })}
            />
            {errors?.password?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
            {errors?.password?.type === 'server' && <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>}
          </FormControl>
          <Flex justifyContent="center">
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
              spinnerPlacement="start"
            >
              Login
            </Button>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
}
