import { AuditType } from './audit';

export type AddressType = {
  addressId?: number;
  country?: string;
  state?: string;
  city?: string;
  line1?: string;
  line2?: string;
  postalCode?: string;
};

export type PhoneType = {
  number?: string;
};

export type CustomerType = AuditType & {
  firstName: string;
  lastName?: string;
  initials?: string;
  customerId: number;
  documentTypeId: number;
  documentTypeName: string;
  titleId: number;
  titleName: string;
  documentId: string;
  addresses: AddressType[];
  currentAddress: AddressType;
  phones: PhoneType[];
  defaultPhone: PhoneType;
};

export type CustomerCreateType = Omit<
  CustomerType,
  | 'customerId'
  | 'documentTypeId'
  | 'titleId'
  | 'updatedAt'
  | 'createdAt'
  | 'createdBy'
  | 'updatedBy'
  | 'addresses'
  | 'phones'
  | 'currentAddress'
  | 'defaultPhone'
> & { customerId?: string | number; addresses: AddressType; phones: PhoneType };

export type CustomerFormType = Omit<
  CustomerType,
  | 'customerId'
  | 'documentTypeId'
  | 'titleId'
  | 'updatedAt'
  | 'createdAt'
  | 'createdBy'
  | 'updatedBy'
  | 'addresses'
  | 'phones'
  | 'currentAddress'
  | 'defaultPhone'
> &
  AddressType &
  PhoneType;
