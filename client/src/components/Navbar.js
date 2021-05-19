import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDisclosure } from './ConfirmationModal';
import { Box, Flex, HStack, Stack } from './Layout';
import { IconButton } from './Button';
import { Image, Link, useColorModeValue } from '@chakra-ui/react';
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

export function Navbar({ links }) {
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
            <Image height="60px" src="/logo512.png" alt="logo" />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {links.map(({ label, url }) => (
                <NavLink key={url} url={url}>{label}</NavLink>
              ))}
            </HStack>
          </HStack>
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
