import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCompaniesAsync,
  selectCompanies,
  selectCompanyStatus,
  selectSelectedCompany,
  selectItem
} from './companySlice';
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
  TableHeading, ConfirmationModal, useToast, useDisclosure,
} from '../../components';
import { unwrapResult } from '@reduxjs/toolkit';
import { IDLE } from '../../constants';

export function CompanyList() {
  const toast = useToast()
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);
  const status = useSelector(selectCompanyStatus);
  const selectedCompany = useSelector(selectSelectedCompany);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (status === IDLE) {
      dispatch(fetchCompaniesAsync());
    }
  }, [dispatch, status]);

  const onDeleteSelected = (company) => {
    dispatch(selectItem(company));
    onOpen();
  }

  const onDelete = async () => {
    try {
      const resultAction = await dispatch(deleteCompanyAsync(selectedCompany.id));
      unwrapResult(resultAction);
      toast({
        title: 'Company deleted.',
        status: 'success',
      })
    } catch (e) {
      toast({
        title: 'Failed to delete company.',
        status: 'error',
      })
    } finally {
      onClose()
    }
  }

  return (
    <>
      <Container maxW="3xl">
        <TableHeading title="Companies" addLink="/companies/create"/>

        <Table colorScheme="teal" variant="striped">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies.map((company) => (
              <Tr key={company.id}>
                <Td>{company.id}</Td>
                <Td>{company.name}</Td>
                <Td>
                  <Stack spacing={3} direction="row" align="center">
                    <Link to={`/companies/${company.id}`}>
                      <IconButton
                        colorScheme="yellow"
                        aria-label="Edit"
                        icon={<EditIcon />}
                      />
                    </Link>
                    <IconButton
                      onClick={() => onDeleteSelected(company)}
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
        confirmationText={`You are deleting company with ${selectedCompany.name}.`}
      />
    </>
  );
}
