import React, { useEffect } from 'react';
import { Heading, Container, useToast, } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { MeetingForm } from './components/MeetingForm';
import { createMeetingAsync } from './meetingSlice';
import { fetchUsersAsync, selectUserStatus, selectUsers } from '../user/userSlice';
import { fetchRoomsAsync, selectRooms, selectRoomStatus } from '../room/roomSlice';
import { IDLE } from '../../constants';
import { setServerErrors } from '../../utils/setServerErrors';

export function CreateMeeting() {
  const toast = useToast()
  const dispatch = useDispatch();
  const { handleSubmit, register, setError, formState: { errors, isSubmitting }, reset, control } = useForm();
  const users = useSelector(selectUsers);
  const rooms = useSelector(selectRooms);
  const userStatus = useSelector(selectUserStatus);
  const roomStatus = useSelector(selectRoomStatus);

  useEffect(() => {
    if (roomStatus === IDLE) {
      dispatch(fetchRoomsAsync());
    }
  }, [dispatch, roomStatus]);

  useEffect(() => {
    if (userStatus === IDLE) {
      dispatch(fetchUsersAsync());
    }
  }, [dispatch, userStatus]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(createMeetingAsync(data));
      unwrapResult(resultAction);
      reset();
      toast({
        title: 'Meeting created.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError);
      toast({
        title: 'Failed to create meeting.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Create meeting
      </Heading>
      <MeetingForm
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isSubmitting={isSubmitting}
        register={register}
        control={control}
        users={users}
        rooms={rooms}
      />
    </Container>
  );
}
