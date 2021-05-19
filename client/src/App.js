import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { UserList } from './features/user/UserList';
import { CreateUser } from './features/user/CreateUser';
import { UpdateUser } from './features/user/UpdateUser';
import { CompanyList } from './features/company/CompanyList';
import { CreateCompany } from './features/company/CreateCompany';
import { UpdateCompany } from './features/company/UpdateCompany';
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { Navbar } from './components';

const links = [
  {
    label: 'Users',
    url: '/users'
  },
  {
    label: 'Companies',
    url: '/companies'
  }
]

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar links={links}/>
        <Routes>
          <Route path="users" element={<UserList/>} />
          <Route path="users/create" element={<CreateUser/>} />
          <Route path="users/:id" element={<UpdateUser/>} />
          <Route path="companies" element={<CompanyList/>} />
          <Route path="companies/create" element={<CreateCompany/>} />
          <Route path="companies/:id" element={<UpdateCompany/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
