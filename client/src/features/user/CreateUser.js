import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  useToast,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync } from './userSlice';
import { fetchCompaniesAsync, selectCompanies, selectCompanyStatus } from '../company/companySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { UserForm } from './components/UserForm';

export function CreateUser() {
  const toast = useToast()
  const dispatch = useDispatch();
  const companyStatus = useSelector(selectCompanyStatus);
  const companies = useSelector(selectCompanies);

  useEffect(() => {
    if (companyStatus === 'idle') {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

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
        title: 'Failed to create user.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Create user
      </Heading>
      <UserForm
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
        companies={companies}
      />
    </Container>
  );
}
