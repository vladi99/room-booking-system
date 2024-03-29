import React, { useEffect } from 'react';
import { Heading, Container, useToast, } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { RoomForm } from './components/RoomForm';
import { createRoomAsync } from './roomSlice';
import { fetchCompaniesAsync, selectCompanies, selectCompanyStatus } from '../company/companySlice';
import { IDLE } from '../../constants';
import { setServerErrors } from '../../utils/setServerErrors';

export function CreateRoom() {
  const toast = useToast()
  const dispatch = useDispatch();
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset, control } = useForm();
  const companyStatus = useSelector(selectCompanyStatus);
  const companies = useSelector(selectCompanies);

  useEffect(() => {
    if (companyStatus === IDLE) {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createRoomAsync(data));
      unwrapResult(resultAction);
      reset();
      toast({
        title: 'Room created.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError);
      toast({
        title: 'Failed to create room.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Create room
      </Heading>
      <RoomForm
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
        control={control}
        companies={companies}
      />
    </Container>
  );
}
