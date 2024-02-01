export interface ILinkModel {
  readonly id?: string;
  readonly uniqueCode?: string;
  readonly shortUrl?: string;
  readonly longUrl?: string;
  readonly visitCount?: number;
  readonly userId?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
