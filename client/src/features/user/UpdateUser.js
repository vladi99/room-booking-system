import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  useToast,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserAsync,
  fetchUserRolesAsync,
  selectRoles,
  selectRolesStatus,
  selectSelectedUser,
  updateUserAsync
} from './userSlice';
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
  const rolesStatus = useSelector(selectRolesStatus);
  const roles = useSelector(selectRoles);
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset, control, setValue } = useForm();
  const { id } = useParams();

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

  useEffect(() => {
    const { roles, ...usr } = user;
    reset(usr);
    setValue('roles', roles)
  }, [user, reset, setValue]);

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
        control={control}
        register={register}
        companies={companies}
        roles={roles}
      />
    </Container>
  );
}
