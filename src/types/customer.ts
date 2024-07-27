import { AuditType } from './audit';

export type AddressType = {
  addressId?: number;
  country?: string;
  region?: string;
  city?: string;
  line1?: string;
  line2?: string;
  postalCode?: string;
  main?: boolean;
};

export type PhoneType = {
  phone?: string;
  main?: boolean;
};

export type EmailType = {
  email?: string;
  main?: boolean;
};

export type CustomerType = AuditType & {
  companyId: number;
  firstName: string;
  lastName?: string;
  initials?: string;
  peopleId: number;
  customerId: number;
  documentTypeId: number;
  documentTypeName: string;
  fullNameWithInitials: string;
  titleId: number;
  titleName: string;
  documentId: string;
  addresses: AddressType[];
  defaultAddress: AddressType;
  phones: PhoneType[];
  defaultPhone: PhoneType;
  emails: EmailType[];
  defaultEmail: EmailType;
};

export type CustomerExcludes =
  'createdAt' | 'createdByAlias' | 'customerId' | 'defaultAddress' | 'defaultEmail' | 'defaultPhone' | 'documentTypeName' | 'fullNameWithInitials' | 'peopleId' | 'titleName' | 'updatedAt' | 'updatedByAlias';

export type CustomerCreateType = Omit<CustomerType, CustomerExcludes> & {
  customerId?: number | string;
};

export type CustomerFormType = AddressType & EmailType & Omit<CustomerType, CustomerExcludes> & PhoneType;
