import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  useToast,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectSelectedUser, updateUserAsync } from './userSlice';
import { fetchCompaniesAsync, selectCompanies, selectCompanyStatus } from '../company/companySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { UserForm } from './components/UserForm';
import { useParams } from 'react-router-dom';
import { IDLE } from '../../constants';
import { setServerErrors } from '../../utils/setServerErrors';

export function UpdateUser() {
  const toast = useToast()
  const dispatch = useDispatch();
  const companyStatus = useSelector(selectCompanyStatus);
  const companies = useSelector(selectCompanies);
  const user = useSelector(selectSelectedUser);
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset } = useForm();
  const { id } = useParams();

  useEffect(() => {
    if (companyStatus === IDLE) {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

  useEffect(() => {
    reset(user)
  }, [user, reset]);

  useEffect(() => {
    dispatch(fetchUserAsync(id))
  }, [dispatch, id]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(updateUserAsync(data));
      unwrapResult(resultAction);
      toast({
        title: 'User updated.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError)
      toast({
        title: 'Failed to update user.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Update user
      </Heading>
      <UserForm
        isUpdate
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
        companies={companies}
      />
    </Container>
  );
}
