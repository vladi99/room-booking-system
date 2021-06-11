import React, { useEffect } from 'react';
import { Heading, Container, useToast, } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { RoomForm } from './components/RoomForm';
import { useParams } from 'react-router-dom';
import { IDLE } from '../../constants';
import { fetchCompaniesAsync, selectCompanies, selectCompanyStatus } from '../company/companySlice';
import { fetchRoomAsync, selectSelectedRoom, updateRoomAsync } from './roomSlice';
import { setServerErrors } from '../../utils/setServerErrors';

export function UpdateRoom() {
  const toast = useToast()
  const dispatch = useDispatch();
  const { handleSubmit, setValue, register, setError, formState: { errors, isSubmitting }, reset, control } = useForm();
  const companyStatus = useSelector(selectCompanyStatus);
  const companies = useSelector(selectCompanies);
  const room = useSelector(selectSelectedRoom);
  const { id } = useParams();

  useEffect(() => {
    if (companyStatus === IDLE) {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

  useEffect(() => {
    const { companies, ...roomValues } = room;
    reset(roomValues);
    setValue('companies', companies)
  }, [room, setValue, reset, dispatch]);

  useEffect(() => {
    dispatch(fetchRoomAsync(id))
  }, [dispatch, id]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(updateRoomAsync(data));
      unwrapResult(resultAction);
      toast({
        title: 'Room updated.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError);
      toast({
        title: 'Failed to update room.',
        description: e.message,
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Update room
      </Heading>
      <RoomForm
        isUpdate
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
