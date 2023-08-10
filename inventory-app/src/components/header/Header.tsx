import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <Box py={3} px={8} boxShadow={'md'}>
      <Text fontSize={'lg'} fontWeight={'medium'}>
        INVENTORY
      </Text>
    </Box>
  );
};

export default React.memo(Header);
