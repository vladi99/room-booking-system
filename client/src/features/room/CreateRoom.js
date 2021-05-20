import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  useToast,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCompaniesAsync,
  selectCompaniesLabels,
  selectCompanyStatus, selectSelectedCompaniesData, selectItems, selectSelectedCompanies
} from '../company/companySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { RoomForm } from './components/RoomForm';
import { createRoomAsync } from './roomSlice';

export function CreateRoom() {
  const toast = useToast()
  const dispatch = useDispatch();
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset } = useForm();
  const companyStatus = useSelector(selectCompanyStatus);
  const companies = useSelector(selectCompaniesLabels);
  const selectedCompanies = useSelector(selectSelectedCompanies);
  const selectedCompaniesData = useSelector(selectSelectedCompaniesData);

  useEffect(() => {
    dispatch(selectItems([]))
  }, [dispatch]);

  useEffect(() => {
    if (companyStatus === 'idle') {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

  const handleCompaniesSelect = (selectedItems) => {
    if (selectedItems) dispatch(selectItems(selectedItems));
  };

  const onSubmit = async (roomData) => {
    try {
      const data = { ...roomData, companies: selectedCompaniesData }
      const resultAction = await dispatch(createRoomAsync(data));
      unwrapResult(resultAction);
      dispatch(selectItems([]));
      reset();
      toast({
        title: 'Room created.',
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
        companies={companies}
        handleCompaniesSelect={handleCompaniesSelect}
        selectedCompanies={selectedCompanies}
      />
    </Container>
  );
}
