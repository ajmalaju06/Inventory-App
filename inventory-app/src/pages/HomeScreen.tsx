import React, { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

import Header from '../components/header/Header';
import SearchBox from '../components/search/SearchBox';
import ProductList from '../components/product-list/ProductList';
import AddUpdateModal from '../components/add-update-modal/AddUpdateModal';
import { ADD_UPDATE_MODAL_TYPE } from '../modals/CommonModal';
import { supabase } from '../helper/Supabase.helper';
import { InventoryData, formDataDetails } from '../modals/InventoryModal';

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [addUpdateModalType, setAddUpdateModalType] =
    useState<ADD_UPDATE_MODAL_TYPE>(ADD_UPDATE_MODAL_TYPE.ADD);
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isItemsLoading, setIsItemsLoading] = useState<boolean>(false);
  const [selectedUpdateItem, setSelectedUpdateItem] = useState<
    InventoryData | undefined
  >();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItemModal = () => {
    setSelectedUpdateItem(undefined);
    setAddUpdateModalType(ADD_UPDATE_MODAL_TYPE.ADD);
    setIsModalOpen(true);
  };

  const updateItemModal = (inventoryData: InventoryData) => {
    setSelectedUpdateItem(inventoryData);
    setAddUpdateModalType(ADD_UPDATE_MODAL_TYPE.UPDATE);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (inventoryData: InventoryData) => {
    setSelectedUpdateItem(inventoryData);
    deleteData(inventoryData.id);
  };

  const handleSearch = (searchText: string) => {
    const filterData = [...inventoryData] || [];
    if (searchText !== '') {
      const inventoryDataTemp = filterData?.filter((item) => {
        return item.product_code
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setFilteredData(inventoryDataTemp || []);
    } else {
      setFilteredData(inventoryData);
    }
  };

  const getData = async () => {
    setIsItemsLoading(true);
    await supabase
      .from('InventoryTable')
      .select('*')
      .then((data) => {
        setIsItemsLoading(false);
        if (data) {
          setInventoryData(data.data || []);
          setFilteredData(data.data || []);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const insertData = async (itemDetails: formDataDetails) => {
    setIsLoading(true);
    await supabase
      .from('InventoryTable')
      .insert({
        product_code: itemDetails.product_code,
        product_name: itemDetails.product_name,
        quantity: itemDetails.quantity,
      })
      .then(() => {
        setIsLoading(false);
        setIsModalOpen(false);
        getData();
      });
  };
  const updateData = async (itemDetails: formDataDetails) => {
    setIsLoading(true);
    await supabase
      .from('InventoryTable')
      .update({
        product_code: itemDetails.product_code,
        product_name: itemDetails.product_name,
        quantity: itemDetails.quantity,
      })
      .eq('id', selectedUpdateItem?.id)
      .then(() => {
        setIsLoading(false);
        setIsModalOpen(false);
        getData();
      });
  };

  const deleteData = async (id: string) => {
    setIsLoading(true);
    await supabase
      .from('InventoryTable')
      .delete()
      .eq('id', id)
      .then(() => {
        setIsLoading(false);
        getData();
      });
  };

  return (
    <Box height={'full'} overflow={'hidden'}>
      <Header />
      <Box
        py={5}
        px={7}
        display={'flex'}
        flexDirection={'column'}
        height={'full'}
      >
        <SearchBox
          handleAddItem={() => handleAddItemModal()}
          serachValue={(e) => handleSearch(e)}
        />
        {isItemsLoading ? (
          <Box
            display={'flex'}
            h={'full'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Spinner size={'sm'} />
          </Box>
        ) : (
          <ProductList
            handleupdateItem={(updateSelectedData) =>
              updateItemModal(updateSelectedData)
            }
            productList={filteredData}
            handleDeleteItem={handleDeleteItem}
          />
        )}
      </Box>

      <AddUpdateModal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        modalType={addUpdateModalType}
        handleSave={(formDetails) => insertData(formDetails)}
        handleUpdate={(formDetails) => updateData(formDetails)}
        primaryButtonDisabled={isLoading}
        updateitemDetails={selectedUpdateItem}
      />
    </Box>
  );
};

export default HomeScreen;
