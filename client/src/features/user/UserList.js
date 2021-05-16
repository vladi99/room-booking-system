import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUsers, selectStatus, fetchUsersAsync } from './userSlice';
import {
  Table,
  TableCaption,
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
    <Container>
      <Table colorScheme="teal" variant="striped">
        <TableCaption placement="top">
          <Grid templateColumns="1fr auto 1fr" alignItems="center">
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
        </TableCaption>
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
              <Td>{user.email}</Td>
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
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
