import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Autocomplete,
} from '../../../components';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../../constants';
import { Controller } from 'react-hook-form';

export function RoomForm(props) {
  const {
    onSubmit,
    errors,
    isSubmitting,
    register,
    companies,
    isUpdate,
    control
  } = props;

  return (
    <form autoComplete="off" noValidate onSubmit={onSubmit}>
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
        {errors?.name?.type === 'maxLength' && <FormErrorMessage>Room name cannot exceed {NAME_MAX_LENGTH} characters</FormErrorMessage>}
        {errors?.name?.type === 'minLength' && <FormErrorMessage>Room name cannot be less {NAME_MIN_LENGTH} characters</FormErrorMessage>}
        {errors?.name?.type === 'server' && <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>}
      </FormControl>
      {isUpdate &&
        <FormControl mb={3} isRequired isInvalid={errors?.companies}>
          <FormLabel>Companies</FormLabel>
          <Controller
            control={control}
            name="companies"
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                valueKey="id"
                labelKey="name"
                options={companies}
                result={field.value}
                setResult={field.onChange}
              />
            )}
          />
        </FormControl>
      }
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
