import {InductionComponent} from "./InductionComponent";

export type ComponentEntry = {
    order: string,
    orderQuantity: number,
    bomQuantity: number,
    components : InductionComponent[]
}