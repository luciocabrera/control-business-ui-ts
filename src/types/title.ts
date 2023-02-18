import { AuditType } from './audit';

export type TitleType = AuditType & {
  titleId: number;
  name: string;
};
export type TitleCreateType = Omit<TitleType, 'titleId'> & { titleId?: number };
