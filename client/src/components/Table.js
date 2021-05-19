import React from 'react';
import {
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
} from '@chakra-ui/react'
import { Grid, GridItem } from './Layout';
import { Heading } from './Typography';
import { Link } from 'react-router-dom';
import { IconButton } from './Button';
import { AddIcon } from './Icon';

export function Table(props) {
  return <ChakraTable {...props}/>
}

export function Tbody(props) {
  return <ChakraTbody {...props}/>
}

export function Thead(props) {
  return <ChakraThead {...props}/>
}

export function Tr(props) {
  return <ChakraTr {...props}/>
}

export function Th(props) {
  return <ChakraTh {...props}/>
}

export function Td(props) {
  return <ChakraTd {...props}/>
}

export function TableHeading(props) {
  return (
    <Grid my={6} templateColumns="1fr auto 1fr" alignItems="center">
      <GridItem colStart={2} >
        <Heading ml="auto" as="h1">
          {props.title}
        </Heading>
      </GridItem>
      <GridItem ml="auto">
        <Link to={props.addLink}>
          <IconButton
            colorScheme="teal"
            aria-label="Add"
            icon={<AddIcon />}
          />
        </Link>
      </GridItem>
    </Grid>
  )
}
