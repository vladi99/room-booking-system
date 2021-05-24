import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Select, Autocomplete
} from '../../../components';
import { ALPHA_NUMERIC, NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../../constants';
import { Controller } from 'react-hook-form';

export function UserForm(props) {
  const {
    onSubmit,
    errors,
    isSubmitting,
    register,
    companies,
    isUpdate,
    roles,
    control
  } = props;

  return (
    <form noValidate onSubmit={onSubmit}>
      <FormControl mb={3} isRequired isInvalid={errors?.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          {...register('email', { required: true })}
        />
        {errors?.email?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
        {errors?.email?.type === 'server' && <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>}
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={errors?.firstName}>
        <FormLabel htmlFor="firstName">First name</FormLabel>
        <Input
          name="firstName"
          type="text"
          {...register('firstName', {
            required: true,
            maxLength: NAME_MAX_LENGTH,
            minLength: NAME_MIN_LENGTH,
            pattern: ALPHA_NUMERIC
          })}
        />
        {errors?.firstName?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
        {errors?.firstName?.type === 'maxLength' && <FormErrorMessage>First name cannot exceed {NAME_MAX_LENGTH} characters</FormErrorMessage>}
        {errors?.firstName?.type === 'minLength' && <FormErrorMessage>First name cannot be less {NAME_MIN_LENGTH} characters</FormErrorMessage>}
        {errors?.firstName?.type === 'pattern' && <FormErrorMessage>Alphabetical characters only</FormErrorMessage>}
        {errors?.firstName?.type === 'server' && <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>}
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={errors?.lastName}>
        <FormLabel htmlFor="lastName">Last name</FormLabel>
        <Input
          name="lastName"
          type="text"
          {...register('lastName', {
            required: true,
            maxLength: NAME_MAX_LENGTH,
            minLength: NAME_MIN_LENGTH,
            pattern: ALPHA_NUMERIC
          })}
        />
        {errors?.lastName?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
        {errors?.lastName?.type === 'maxLength' && <FormErrorMessage>Last name cannot exceed {NAME_MAX_LENGTH} characters</FormErrorMessage>}
        {errors?.lastName?.type === 'minLength' && <FormErrorMessage>Last name cannot be less {NAME_MIN_LENGTH} characters</FormErrorMessage>}
        {errors?.lastName?.type === 'pattern' && <FormErrorMessage>Alphabetical characters only</FormErrorMessage>}
        {errors?.lastName?.type === 'server' && <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>}
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={errors?.companyId}>
        <FormLabel htmlFor="company">Company</FormLabel>
        <Select
          placeholder="Select option"
          name="company"
          type="text"
          {...register('companyId', { required: true })}
        >
          {companies.map(({id, name}) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </Select>
        {errors?.companyId?.type === 'required' && <FormErrorMessage>Company is required</FormErrorMessage>}
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={errors?.roles}>
        <FormLabel>Roles</FormLabel>
        <Controller
          control={control}
          name="roles"
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              valueKey="id"
              labelKey="name"
              options={roles}
              result={field.value}
              setResult={field.onChange}
            />
          )}
        />
        {errors?.roles?.type === 'server' && <FormErrorMessage>{errors?.roles?.message}</FormErrorMessage>}
      </FormControl>
      <Flex>
        <Button
          isLoading={isSubmitting}
          mt={4}
          type="submit"
          colorScheme="teal"
          spinnerPlacement="start"
        >
          {isUpdate ? 'Update' : 'Create'}
        </Button>
      </Flex>
    </form>
  );
}
