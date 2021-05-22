import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Autocomplete,
  Select,
  DatePicker
} from '../../../components';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../../constants';
import { Controller } from 'react-hook-form';

export function MeetingForm(props) {
  const {
    onSubmit,
    errors,
    isSubmitting,
    register,
    users,
    isUpdate,
    rooms,
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
        {errors?.name?.type === 'maxLength' && <FormErrorMessage>Meeting name cannot exceed {NAME_MAX_LENGTH} characters</FormErrorMessage>}
        {errors?.name?.type === 'minLength' && <FormErrorMessage>Meeting name cannot be less {NAME_MIN_LENGTH} characters</FormErrorMessage>}
        {errors?.name?.type === 'server' && <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>}
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={errors?.users}>
        <FormLabel>Attendees</FormLabel>
        <Controller
          control={control}
          name="users"
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              valueKey="id"
              labelKey="email"
              options={users}
              result={field.value}
              setResult={field.onChange}
            />
          )}
        />
      </FormControl>
      <FormControl mb={3} isInvalid={errors?.roomId}>
        <FormLabel htmlFor="room">Room</FormLabel>
        <Select
          placeholder="Select option"
          name="room"
          type="text"
          {...register('roomId')}
        >
          {rooms.map(({id, name}) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={errors?.name}>
        <FormLabel>Start</FormLabel>
        <Controller
          control={control}
          name="start"
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormControl>
      <FormControl mb={3} isRequired isInvalid={errors?.name}>
        <FormLabel>End</FormLabel>
        <Controller
          control={control}
          name="end"
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
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
