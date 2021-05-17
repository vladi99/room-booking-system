import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUsers, selectStatus, fetchUsersAsync } from './userSlice';
import {
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
  Container,
  Heading,
  IconButton,
  EditIcon, DeleteIcon, Stack, AddIcon, Grid, GridItem
} from '../../components';

export function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsersAsync());
    }
  }, [dispatch, status]);

  return (
    <Container maxW="3xl">
      <Grid my={6} templateColumns="1fr auto 1fr" alignItems="center">
        <GridItem colStart={2} >
          <Heading ml="auto" as="h1">
            Users
          </Heading>
        </GridItem>
        <GridItem ml="auto">
          <Link to="/users/create">
            <IconButton
              colorScheme="teal"
              aria-label="Add"
              icon={<AddIcon />}
            />
          </Link>
        </GridItem>
      </Grid>

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
                  <IconButton
                    colorScheme="yellow"
                    aria-label="Edit"
                    icon={<EditIcon />}
                  />
                  <IconButton
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
  );
}
