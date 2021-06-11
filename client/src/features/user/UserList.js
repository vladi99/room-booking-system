import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectUsers,
  fetchUsersAsync,
  selectUserStatus,
  deleteUserAsync,
  selectSelectedUser,
  selectItem,
} from './userSlice';
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

export function UserList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUserStatus);
  const selectedUser = useSelector(selectSelectedUser);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (status === IDLE) {
      dispatch(fetchUsersAsync());
    }
  }, [dispatch, status]);

  const onDeleteSelected = (user) => {
    dispatch(selectItem(user));
    onOpen();
  }

  const onDelete = async () => {
    try {
      const resultAction = await dispatch(deleteUserAsync(selectedUser.id));
      unwrapResult(resultAction);
      toast({
        title: 'User deleted.',
        status: 'success',
      })
    } catch (e) {
      toast({
        title: 'Failed to delete user.',
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
        <TableHeading title="Users" addLink="/app/users/create"/>

        <Table colorScheme="teal" variant="striped">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Email</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td maxW={200}>{user.email}</Td>
                <Td maxW={200}>{user.firstName}</Td>
                <Td maxW={200}>{user.lastName}</Td>
                <Td>
                  <Stack spacing={3} direction="row" align="center">
                    <Link to={`/app/users/${user.id}`}>
                      <IconButton
                        colorScheme="yellow"
                        aria-label="Edit"
                        icon={<EditIcon />}
                      />
                    </Link>
                    <IconButton
                      onClick={() => onDeleteSelected(user)}
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
        confirmationText={`You are deleting user with ${selectedUser.email}.`}
      />
    </>
  );
}
