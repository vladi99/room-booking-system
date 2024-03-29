import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  useToast,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync, fetchUserRolesAsync, selectRoles, selectRolesStatus } from './userSlice';
import { fetchCompaniesAsync, selectCompanies, selectCompanyStatus } from '../company/companySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { UserForm } from './components/UserForm';
import { IDLE } from '../../constants';
import { setServerErrors } from '../../utils/setServerErrors';

export function CreateUser() {
  const toast = useToast()
  const dispatch = useDispatch();
  const companyStatus = useSelector(selectCompanyStatus);
  const companies = useSelector(selectCompanies);
  const rolesStatus = useSelector(selectRolesStatus);
  const roles = useSelector(selectRoles);
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset, control } = useForm();

  useEffect(() => {
    if (companyStatus === IDLE) {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

  useEffect(() => {
    if (rolesStatus === IDLE) {
      dispatch(fetchUserRolesAsync());
    }
  }, [dispatch, rolesStatus]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createUserAsync(data));
      unwrapResult(resultAction);
      reset();
      toast({
        title: 'User created.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError)
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
        control={control}
        companies={companies}
        roles={roles}
      />
    </Container>
  );
}
