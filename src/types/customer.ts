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

export type EmailType = {
  email?: string;
};

export type CustomerType = AuditType & {
  firstName: string;
  lastName?: string;
  initials?: string;
  customerId: number;
  documentTypeId: number;
  documentTypeName: string;
  fullNameWithInitials: string;
  titleId: number;
  titleName: string;
  documentId: string;
  addresses: AddressType[];
  currentAddress: AddressType;
  phones: PhoneType[];
  defaultPhone: PhoneType;
  emails: EmailType[];
  defaultEmail: EmailType;
};

export type CustomerExcludes =
  | 'customerId'
  | 'documentTypeId'
  | 'titleId'
  | 'updatedAt'
  | 'createdAt'
  | 'createdBy'
  | 'updatedBy'
  | 'addresses'
  | 'phones'
  | 'emails'
  | 'currentAddress'
  | 'defaultPhone'
  | 'defaultEmail'
  | 'fullNameWithInitials';

export type CustomerCreateType = Omit<CustomerType, CustomerExcludes> & {
  customerId?: string | number;
  addresses: AddressType;
  phones: PhoneType;
  emails: EmailType;
};

export type CustomerFormType = Omit<CustomerType, CustomerExcludes> & AddressType & PhoneType & EmailType;
