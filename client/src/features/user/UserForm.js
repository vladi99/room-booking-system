import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Container,
  Flex,
  useToast,
  FormErrorMessage
} from '../../components';
import { useDispatch } from 'react-redux';
import { createUserAsync } from './userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { ALPHA_NUMERIC, NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../constants';

export function UserForm() {
  const toast = useToast()
  const dispatch = useDispatch();

  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createUserAsync(data));
      unwrapResult(resultAction);
      reset();
      toast({
        title: 'User created.',
        status: 'success',
      })
    } catch (errors) {
      errors.forEach((error) => {
        setError(error.path, {
          type: 'server',
          message: error.message
        })
      });

      toast({
        title: 'Failed to create account.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Create user
      </Heading>
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
        <FormControl mb={3} isRequired isInvalid={errors?.firstName}>
          <FormLabel htmlFor="firstName">First name</FormLabel>
          <Input
            name="firstName"
            type="text"
            {...register('firstName', {
              required: true,
              maxLength: NAME_MAX_LENGTH,
              minLength: NAME_MIN_LENGTH,
              pattern: ALPHA_NUMERIC
            })}
          />
          {errors?.firstName?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
          {errors?.firstName?.type === 'maxLength' && <FormErrorMessage>First name cannot exceed {NAME_MAX_LENGTH} characters</FormErrorMessage>}
          {errors?.firstName?.type === 'minLength' && <FormErrorMessage>First name cannot be less {NAME_MIN_LENGTH} characters</FormErrorMessage>}
          {errors?.firstName?.type === 'pattern' && <FormErrorMessage>Alphabetical characters only</FormErrorMessage>}
          {errors?.firstName?.type === 'server' && <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>}
        </FormControl>
        <FormControl mb={3} isRequired isInvalid={errors?.lastName}>
          <FormLabel htmlFor="lastName">Last name</FormLabel>
          <Input
            name="lastName"
            type="text"
            {...register('lastName', {
              required: true,
              maxLength: NAME_MAX_LENGTH,
              minLength: NAME_MIN_LENGTH,
              pattern: ALPHA_NUMERIC
            })}
          />
          {errors?.lastName?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
          {errors?.lastName?.type === 'maxLength' && <FormErrorMessage>Last name cannot exceed {NAME_MAX_LENGTH} characters</FormErrorMessage>}
          {errors?.lastName?.type === 'minLength' && <FormErrorMessage>Last name cannot be less {NAME_MIN_LENGTH} characters</FormErrorMessage>}
          {errors?.lastName?.type === 'pattern' && <FormErrorMessage>Alphabetical characters only</FormErrorMessage>}
          {errors?.lastName?.type === 'server' && <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>}
        </FormControl>
        <Flex>
          <Button
            isLoading={isSubmitting}
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
