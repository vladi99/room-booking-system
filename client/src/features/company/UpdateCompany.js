import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  useToast,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCompanyAsync,
  selectSelectedCompany,
  updateCompanyAsync
} from './companySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { CompanyForm } from './components/CompanyForm';
import { useParams } from 'react-router-dom';

export function UpdateCompany() {
  const toast = useToast()
  const dispatch = useDispatch();
  const company = useSelector(selectSelectedCompany);
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset } = useForm();
  const { id } = useParams();

  useEffect(() => {
    reset(company)
  }, [company, reset]);

  useEffect(() => {
    dispatch(fetchCompanyAsync(id))
  }, [dispatch, id]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(updateCompanyAsync(data));
      unwrapResult(resultAction);
      toast({
        title: 'Company updated.',
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
        title: 'Failed to update company.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Update company
      </Heading>
      <CompanyForm
        isUpdate
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
      />
    </Container>
  );
}
