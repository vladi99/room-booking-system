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
  deleteRoomAsync,
  fetchRoomsAsync,
  selectItem,
  selectRooms,
  selectRoomStatus,
  selectSelectedRoom
} from './roomSlice';

export function RoomList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const status = useSelector(selectRoomStatus);
  const selectedRoom = useSelector(selectSelectedRoom);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (status === IDLE) {
      dispatch(fetchRoomsAsync());
    }
  }, [dispatch, status]);

  const onDeleteSelected = (room) => {
    dispatch(selectItem(room));
    onOpen();
  }

  const onDelete = async () => {
    try {
      const resultAction = await dispatch(deleteRoomAsync(selectedRoom.id));
      unwrapResult(resultAction);
      toast({
        title: 'Room deleted.',
        status: 'success',
      })
    } catch (e) {
      toast({
        title: 'Failed to delete room.',
        status: 'error',
      })
    } finally {
      onClose()
    }
  }

  return (
    <>
      <Container maxW="3xl">
        <TableHeading title="Rooms" addLink="/rooms/create"/>

        <Table colorScheme="teal" variant="striped">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rooms.map((room) => (
              <Tr key={room.id}>
                <Td>{room.id}</Td>
                <Td>{room.name}</Td>
                <Td>
                  <Stack spacing={3} direction="row" align="center">
                    <Link to={`/rooms/${room.id}`}>
                      <IconButton
                        colorScheme="yellow"
                        aria-label="Edit"
                        icon={<EditIcon />}
                      />
                    </Link>
                    <IconButton
                      onClick={() => onDeleteSelected(room)}
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
        confirmationText={`You are deleting room ${selectedRoom.name}.`}
      />
    </>
  );
}
