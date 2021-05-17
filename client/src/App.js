import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { UserList } from './features/user/UserList';
import { UserForm } from './features/user/UserForm';
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="users" element={<UserList/>} />
          <Route path="users/create" element={<UserForm/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
