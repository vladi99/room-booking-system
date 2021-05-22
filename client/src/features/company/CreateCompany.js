import React, { useEffect } from 'react';
import {
  Heading,
  Container,
  useToast,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { createCompanyAsync, fetchCompaniesAsync, selectCompanyStatus } from './companySlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { CompanyForm } from './components/CompanyForm';
import { IDLE } from '../../constants';
import { setServerErrors } from '../../utils/setServerErrors';

export function CreateCompany() {
  const toast = useToast()
  const dispatch = useDispatch();
  const companyStatus = useSelector(selectCompanyStatus);

  useEffect(() => {
    if (companyStatus === IDLE) {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, companyStatus]);

  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createCompanyAsync(data));
      unwrapResult(resultAction);
      reset();
      toast({
        title: 'Company created.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError)
      toast({
        title: 'Failed to create company.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Create company
      </Heading>
      <CompanyForm
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
      />
    </Container>
  );
}
