import React, { useState, useRef } from 'react';
import { Badge, Box, Flex, Input, List, ListItem } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import { matchSorter } from 'match-sorter';

export const Autocomplete = ({
  options,
  result = [],
  setResult,
  inputName,
  isInvalid,
  labelKey = 'label',
  valueKey = 'value'
}) => {
  const [partialResult, setPartialResult] = useState();
  const [displayOptions, setDisplayOptions] = useState(false);
  const inputRef = useRef(null);

  const filterOptions = (inputValue) => {
    if (inputValue) {
      setDisplayOptions(true);
      setPartialResult(matchSorter(options, inputValue, { keys: [labelKey, valueKey] }));
    } else {
      setDisplayOptions(false);
    }
  };

  const isOptionSelected = (option) => {
    return result.some((selectedOption) => selectedOption[valueKey] === option[valueKey])
  };

  const selectOption = (option) => {
    if (isOptionSelected(option)) {
      setResult(result.filter((existingOption) => existingOption[valueKey] !== option[valueKey]));
    } else {
      setResult([option, ...result]);
    }
  };

  const selectOptionFromList = (option) => {
    selectOption(option);
    setDisplayOptions(false);
    if (inputRef && inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };

  const renderCheckIcon = (option) => {
    if (isOptionSelected(option)) {
      return <CheckCircleIcon color="green.500" mr={2} />;
    }
    return null;
  };

  return (
    <Box>
      {result?.length > 0 && (
        <Box my={2}>
          {result.map((option) => (
            <Box
              d="inline-block"
              onClick={() => selectOption(option)}
              key={option[valueKey]}
            >
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="teal"
                mx={1}
                cursor="pointer"
              >
                {option[labelKey]}
                <CloseIcon ml={1} w={2} h={2} mb="4px" />
              </Badge>
              {' '}
            </Box>
          ))}
        </Box>
      )}
      <Input
        name={inputName}
        onChange={(e) => filterOptions(e.currentTarget.value)}
        ref={inputRef}
        isInvalid={isInvalid}
      />
      {displayOptions && (
        <List
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
          mt={2}
        >
          {partialResult?.map((option) => {
            return (
              <ListItem
                key={option[valueKey]}
                _hover={{ bg: 'gray.100' }}
                my={1}
                p={2}
                cursor="pointer"
                onClick={() => selectOptionFromList(option)}
              >
                <Flex align="center">
                  {renderCheckIcon(option)}
                  {option[labelKey]}
                </Flex>
              </ListItem>
            );
          })}
          {!partialResult?.length && (
            <ListItem my={1} p={2}>
              <Flex align="center">Not found</Flex>
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
}
