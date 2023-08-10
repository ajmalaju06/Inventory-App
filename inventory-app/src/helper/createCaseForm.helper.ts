import { formDataDetails } from '../modals/InventoryModal';

export const createCaseFormInitialState: formDataDetails = {
  product_code: '',
  product_name: '',
  quantity: '',
};

export const validationRules = {
  product_code: (value: string) => {
    if (!value) return 'Product code is required.';
    return undefined;
  },
  product_name: (value: string) => {
    if (!value) return 'Product name is required.';
    return undefined;
  },
  quantity: (value: string) => {
    if (!value) return 'quantity is required.';
    return undefined;
  },
};
