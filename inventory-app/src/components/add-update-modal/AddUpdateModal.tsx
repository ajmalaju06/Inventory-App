import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { ADD_UPDATE_MODAL_TYPE } from '../../modals/CommonModal';
import FormControl from '../shared/FormControl';
import useFormValidation from '../../hooks/useFormValidation';
import {
  createCaseFormInitialState,
  validationRules,
} from '../../helper/createCaseForm.helper';
import { InventoryData, formDataDetails } from '../../modals/InventoryModal';

interface AddUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: ADD_UPDATE_MODAL_TYPE;
  handleSave: (data: formDataDetails) => void;
  handleUpdate: (data: formDataDetails) => void;
  primaryButtonDisabled?: boolean;
  updateitemDetails: InventoryData | undefined;
}

const AddUpdateModal: React.FC<AddUpdateModalProps> = ({
  isOpen,
  onClose,
  modalType,
  handleSave,
  handleUpdate,
  primaryButtonDisabled,
  updateitemDetails,
}) => {
  const {
    formData,
    formErrors,
    handleChange,
    handleSubmit,
    isFormValid,
    clearForm,
  } = useFormValidation(createCaseFormInitialState, validationRules);

  useEffect(() => {
    if (updateitemDetails) {
      handleChange('product_code', updateitemDetails.product_code);
      handleChange('product_name', updateitemDetails.product_name);
      handleChange('quantity', updateitemDetails.quantity);
    } else {
      clearForm();
    }
  }, [updateitemDetails]);

  const validateForm = (data: formDataDetails) => {
    if (isFormValid()) {
      if (modalType == ADD_UPDATE_MODAL_TYPE.ADD) {
        handleSave(data);
      } else {
        handleUpdate(data);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalType == ADD_UPDATE_MODAL_TYPE.ADD ? 'Add Item' : 'Update Item'}
        </ModalHeader>
        <ModalCloseButton
          onClick={() => {
            clearForm();
            onClose();
          }}
        />
        <ModalBody>
          <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <FormControl
                label="Product Code"
                gap={1}
                flex={1}
                display="flex"
                flexDirection="column"
                isInvalid={!!formErrors.product_code}
                errorMsg={formErrors.product_code}
              >
                <Input
                  size={'md'}
                  placeholder="Product Code"
                  onChange={(event) => {
                    handleChange('product_code', event.target.value);
                  }}
                  value={formData.product_code}
                />
              </FormControl>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <FormControl
                label="Product Name"
                gap={1}
                flex={1}
                display="flex"
                flexDirection="column"
                isInvalid={!!formErrors.product_name}
                errorMsg={formErrors.product_name}
              >
                <Input
                  size={'md'}
                  placeholder="Product Name"
                  onChange={(event) => {
                    handleChange('product_name', event.target.value);
                  }}
                  value={formData.product_name}
                />
              </FormControl>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <FormControl
                label="Quantity"
                gap={1}
                flex={1}
                display="flex"
                flexDirection="column"
                isInvalid={!!formErrors.quantity}
                errorMsg={formErrors.quantity}
              >
                <Input
                  size={'md'}
                  placeholder="Quantity"
                  onChange={(event) => {
                    handleChange('quantity', event.target.value);
                  }}
                  value={formData.quantity}
                  type='number'
                />
              </FormControl>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              clearForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={primaryButtonDisabled}
            onClick={() => {
              handleSubmit();
              validateForm(formData as formDataDetails);
            }}
          >
            {primaryButtonDisabled ? (
              <Spinner size={'sm'} />
            ) : modalType == ADD_UPDATE_MODAL_TYPE.ADD ? (
              'Save'
            ) : (
              'Update'
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUpdateModal;
