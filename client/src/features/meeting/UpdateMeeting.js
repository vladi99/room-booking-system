import React, { useEffect } from 'react';
import { Heading, Container, useToast, } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { MeetingForm } from './components/MeetingForm';
import { useParams } from 'react-router-dom';
import { IDLE } from '../../constants';
import { fetchUsersAsync, selectUsers, selectUserStatus } from '../user/userSlice';
import { fetchRoomsAsync, selectRooms, selectRoomStatus } from '../room/roomSlice';
import { updateMeetingAsync, fetchMeetingAsync, selectSelectedMeeting } from './meetingSlice';
import { setServerErrors } from '../../utils/setServerErrors';

export function UpdateMeeting() {
  const toast = useToast()
  const dispatch = useDispatch();
  const { handleSubmit, setValue, register, setError, formState: { errors, isSubmitting }, reset, control } = useForm();
  const users = useSelector(selectUsers);
  const rooms = useSelector(selectRooms);
  const userStatus = useSelector(selectUserStatus);
  const roomStatus = useSelector(selectRoomStatus);
  const meeting = useSelector(selectSelectedMeeting);
  const { id } = useParams();

  useEffect(() => {
    if (userStatus === IDLE) {
      dispatch(fetchUsersAsync());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (roomStatus === IDLE) {
      dispatch(fetchRoomsAsync());
    }
  }, [dispatch, roomStatus]);

  useEffect(() => {
    const { users, ...meet } = meeting;
    reset(meet);
    setValue('users', users)
  }, [meeting, setValue, reset]);

  useEffect(() => {
    dispatch(fetchMeetingAsync(id))
  }, [dispatch, id]);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(updateMeetingAsync(data));
      unwrapResult(resultAction);
      toast({
        title: 'Meeting updated.',
        status: 'success',
      })
    } catch (e) {
      setServerErrors(e, setError);
      toast({
        title: 'Failed to update meeting.',
        status: 'error',
      })
    }
  };

  return (
    <Container>
      <Heading as="h1" my={6} textAlign="center">
        Update meeting
      </Heading>
      <MeetingForm
        isUpdate
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
