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
  selectCompanyStatus, selectItems, selectSelectedCompanies, selectSelectedCompaniesData
} from '../company/companySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { RoomForm } from './components/RoomForm';
import { useParams } from 'react-router-dom';
import { fetchRoomAsync, selectSelectedRoom, updateRoomAsync } from './roomSlice';

export function UpdateRoom() {
  const toast = useToast()
  const dispatch = useDispatch();
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset } = useForm();
  const companyStatus = useSelector(selectCompanyStatus);
  const companies = useSelector(selectCompaniesLabels);
  const selectedCompanies = useSelector(selectSelectedCompanies);
  const selectedCompaniesData = useSelector(selectSelectedCompaniesData);
  const room = useSelector(selectSelectedRoom);
  const { id } = useParams();

  useEffect(() => {
    if (companyStatus === 'idle') {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

  useEffect(() => {
    reset(room)
    dispatch(selectItems(room.companies?.map(({id, name}) => ({value: id, label: name}))))
  }, [room, reset, dispatch]);

  useEffect(() => {
    dispatch(fetchRoomAsync(id))
  }, [dispatch, id]);

  const handleCompaniesSelect = (selectedItems) => {
    if (selectedItems) dispatch(selectItems(selectedItems));
  };

  const onSubmit = async (roomData) => {
    try {
      const data = { ...roomData, companies: selectedCompaniesData }
      const resultAction = await dispatch(updateRoomAsync(data));
      unwrapResult(resultAction);
      toast({
        title: 'Room updated.',
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
        title: 'Failed to update room.',
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
        companies={companies}
        handleCompaniesSelect={handleCompaniesSelect}
        selectedCompanies={selectedCompanies}
      />
    </Container>
  );
}
