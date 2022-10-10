import { AuditType } from './audit';

export type DocumentTypeType = AuditType & {
  documentTypeId: number;
  name: string;
};
export type DocumentTypeCreateType = Omit<DocumentTypeType, 'documentTypeId'> & { documentTypeId?: number };
