/*
  Here we typed in simple models manually. But there are many tools out there
  for generating database models automatically, from an existing database.

  For example, schemats: https://github.com/sweetiq/schemats
*/

export interface ISfcAssy {
    id: number;
    sfcBo: string;
    shopOrderBo: string;
    resourceBo: string;
    operationBo: string;
    componentBo: string;
    qty: number;
    bomComponentBo: string;
    insUser: string;
    insDate: Date;
    updUser: string;
    updDate: Date;
    isDeleted: string;
}
