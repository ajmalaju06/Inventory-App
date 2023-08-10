import { Box, Button, Input } from '@chakra-ui/react';
import React from 'react';

interface SearchBoxProps {
  handleAddItem: () => void;
  serachValue: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  handleAddItem,
  serachValue,
}) => {
  return (
    <Box display={'flex'} gap={3}>
      <Input
        placeholder="Search"
        _focusVisible={{ boxShadow: 'none' }}
        onChange={(e) => serachValue(e.target.value)}
      ></Input>
      <Button colorScheme="blue" onClick={handleAddItem}>
        Add Item
      </Button>
    </Box>
  );
};

export default SearchBox;
