import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
  Container,
  IconButton,
  EditIcon, DeleteIcon, Stack,
  TableHeading, ConfirmationModal, useToast,
} from '../../components';
import { useDisclosure } from '@chakra-ui/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { IDLE } from '../../constants';
import {
  deleteMeetingAsync,
  fetchMeetingsAsync,
  selectItem,
  selectMeetings,
  selectMeetingStatus,
  selectSelectedMeeting
} from './meetingSlice';

export function MeetingList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const meetings = useSelector(selectMeetings);
  const status = useSelector(selectMeetingStatus);
  const selectedMeeting = useSelector(selectSelectedMeeting);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (status === IDLE) {
      dispatch(fetchMeetingsAsync());
    }
  }, [dispatch, status]);

  const onDeleteSelected = (meeting) => {
    dispatch(selectItem(meeting));
    onOpen();
  }

  const onDelete = async () => {
    try {
      const resultAction = await dispatch(deleteMeetingAsync(selectedMeeting.id));
      unwrapResult(resultAction);
      toast({
        title: 'Meeting cancelled.',
        status: 'success',
      })
    } catch (e) {
      toast({
        title: 'Failed to cancel a meeting.',
        description: e.message,
        status: 'error',
      })
    } finally {
      onClose()
    }
  }

  return (
    <>
      <Container maxW="3xl">
        <TableHeading title="Meetings" addLink="/app/meetings/create"/>

        <Table colorScheme="teal" variant="striped">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Start</Th>
              <Th>End</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {meetings.map((meeting) => (
              <Tr key={meeting.id}>
                <Td>{meeting.id}</Td>
                <Td>{meeting.name}</Td>
                <Td>{meeting.start}</Td>
                <Td>{meeting.end}</Td>
                <Td>
                  <Stack spacing={3} direction="row" align="center">
                    <Link to={`/app/meetings/${meeting.id}`}>
                      <IconButton
                        colorScheme="yellow"
                        aria-label="Edit"
                        icon={<EditIcon />}
                      />
                    </Link>
                    <IconButton
                      onClick={() => onDeleteSelected(meeting)}
                      colorScheme="red"
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                    />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
      <ConfirmationModal
        onClose={onClose}
        isOpen={isOpen}
        onConfirm={onDelete}
        confirmationText={`You are cancelling meeting ${selectedMeeting.name}.`}
      />
    </>
  );
}
