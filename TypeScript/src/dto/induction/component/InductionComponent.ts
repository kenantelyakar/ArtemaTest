export type InductionComponent = {
    material:string,
    uom?: string | any,
    materialDesc: string,
    materialQty: number,
    upperLimit: number,
    theoreticQuantity: number,
    totalQuantity:number,
    tolerance: number,
    sumQty: number,
    userDefQty: number,
    userDeleteQty: number,
    valueState: string,
    valueMessage: string,
    valueDeleteState: string,
    valueDeleteMessage: string
}