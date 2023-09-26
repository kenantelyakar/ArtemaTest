import {BOM, CustomValue} from '../../../apisdk/sapdme_bom';
import {BomApi} from "../../../srv/BomApi";
import {OrderApi} from "../../../srv/OrderApi";
import {ComponentEntry} from "../../../dto/induction/component/ComponentEntry";
import {InductionComponent} from "../../../dto/induction/component/InductionComponent";

export abstract class AssemblyServices{
    static async getBOMInfoBySfc(plant: string , sfc: string): Promise<ComponentEntry>{
        let oCArray : InductionComponent[] = [];
        let componentsResponse : ComponentEntry =
            {order: '', orderQuantity: 0, bomQuantity: 0, components: oCArray};
        return await OrderApi.getSfcDetails(plant,sfc).then(async sfcResp => {
             return await OrderApi.getOrders(plant, sfcResp.order.order).then(async orderResp => {
                return await BomApi.getBom(orderResp.bom.bom, orderResp.plant, orderResp.bom.type).then(async oB => {
                    for (let c of oB[0].components) {
                        let oC: InductionComponent = {
                            uom: "",
                            material: "",
                            materialQty: 0,
                            theoreticQuantity: 0,
                            upperLimit: 0,
                            totalQuantity: 0,
                            tolerance: 1.10,
                            sumQty:0,
                            userDefQty:0,
                            userDeleteQty:0
                        };
                        if (c.customValues != undefined)
                            oC.tolerance = Number(c.customValues.filter((x: CustomValue) => {
                                if (x.attribute == "TOLERANCE")
                                    return x.value;
                            }));
                        if (oC.tolerance == 0)
                            oC.tolerance = 1.10;
                        oC.materialQty = c.quantity;
                        oC.theoreticQuantity = c.totalQuantity;
                        oC.upperLimit = oC.tolerance * oC.theoreticQuantity;
                        oC.uom = c.unitOfMeasure;
                        oC.material = c.material.material;

                        oCArray.push(oC);
                    }
                    componentsResponse.orderQuantity = orderResp.releasedQuantity;
                    componentsResponse.order = orderResp.order;
                    componentsResponse.bomQuantity = Number(oB[0].customValues.filter((x: CustomValue) => {
                        if (x.attribute == "BOM_QTY")
                            return x.value;
                    }));
                    componentsResponse.components = oCArray;
                    return componentsResponse;
                });
            });
        });



    }
}