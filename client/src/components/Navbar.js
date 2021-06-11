import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDisclosure } from './ConfirmationModal';
import { Box, Flex, HStack, Stack } from './Layout';
import { Button, IconButton } from './Button';
import {
  Avatar,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const NavLink = ({ children, url }) => (
  <Link
    as={ReactRouterLink}
    to={url}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}>
    {children}
  </Link>
);

export function Navbar({ links, logOut, prefix, user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <ReactRouterLink to="/">
              <Image height="60px" src="/logo512.png" alt="logo" />
            </ReactRouterLink>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {links.filter(({title}) => title).map(({ title, path }) => (
                <NavLink key={`${prefix}${path}`} url={`${prefix}${path}`}>{title}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}>
                <Avatar
                  size={'sm'}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>{user.email}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map(({ label, url }) => (
                <NavLink key={url} url={url}>{label}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
