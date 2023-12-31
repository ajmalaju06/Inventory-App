import React from 'react';
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import EllipsisImg from '../../assets/ellipsis.svg';
import { InventoryData } from '../../modals/InventoryModal';
import FolderImg from '../../assets/folder-gray.svg';

interface ProductListProps {
  handleupdateItem: (updateDetails: InventoryData) => void;
  productList: InventoryData[] | null;
  handleDeleteItem: (updateDetails: InventoryData) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  handleupdateItem,
  productList,
  handleDeleteItem,
}) => {
  return (
    <Box
      pt={5}
      pb={'5rem'}
      display={'flex'}
      flexDirection={'column'}
      height={'full'}
    >
      {productList?.length === 0 ? (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          h="full"
          flexDirection={'column'}
        >
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Text fontSize={'xl'} fontWeight={'bold'} color={'gray.400'}>
              No data found
            </Text>
            <Image src={FolderImg} alt="folder" w={7} />
          </Box>
          <Box>
            <Text fontSize={'md'} color={'gray.400'} textAlign={'center'}>
              click the 'Add item' button to add a new item
            </Text>
          </Box>
        </Box>
      ) : (
        <TableContainer overflowY={'auto'} height={'full'}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Sl no</Th>
                <Th>Product Code</Th>
                <Th>Product Name</Th>
                <Th>Qty</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {productList !== null &&
                productList.map((item, index) => {
                  return (
                    <Tr key={item.id}>
                      <Td>{index + 1}</Td>
                      <Td>{item.product_code}</Td>
                      <Td>{item.product_name}</Td>
                      <Td>{item.quantity}</Td>
                      <Td display={'flex'} justifyContent={'flex-end'}>
                        <Menu>
                          <MenuButton>
                            <Image
                              src={EllipsisImg}
                              alt="elipsis"
                              minW={4}
                              w={4}
                              h={'auto'}
                              cursor={'pointer'}
                            />
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                handleupdateItem(item);
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleDeleteItem(item);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProductList;
