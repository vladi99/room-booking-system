import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
} from '../../../components';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../../constants';

export function CompanyForm(props) {
  const {
    onSubmit,
    errors,
    isSubmitting,
    register,
    isUpdate
  } = props;

  return (
    <form noValidate onSubmit={onSubmit}>
      <FormControl mb={3} isRequired isInvalid={errors?.name}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          {...register('name', {
            required: true,
            maxLength: NAME_MAX_LENGTH,
            minLength: NAME_MIN_LENGTH,
          })}
        />
        {errors?.name?.type === 'required' && <FormErrorMessage>This field is required</FormErrorMessage>}
        {errors?.name?.type === 'maxLength' && <FormErrorMessage>Company name cannot exceed {NAME_MAX_LENGTH} characters</FormErrorMessage>}
        {errors?.name?.type === 'minLength' && <FormErrorMessage>Company name cannot be less {NAME_MIN_LENGTH} characters</FormErrorMessage>}
        {errors?.name?.type === 'server' && <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>}
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
