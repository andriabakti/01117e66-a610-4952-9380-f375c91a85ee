import { ILinkModel } from '@/server/modules/links/interfaces/link-model.interface';

export interface IUserModel {
  readonly id?: string;
  readonly username?: string;
  readonly email?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly links?: ILinkModel[];
}
