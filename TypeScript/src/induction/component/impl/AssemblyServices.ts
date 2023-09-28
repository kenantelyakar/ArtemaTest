import {BomComponent, CustomValue} from '../../../apisdk/sapdme_bom';
import {BomApi} from "../../../srv/BomApi";
import {OrderApi} from "../../../srv/OrderApi";
import {ComponentEntry} from "../../../dto/induction/component/ComponentEntry";
import {InductionComponent} from "../../../dto/induction/component/InductionComponent";
import {MaterialApi} from "../../../srv/MaterialApi";
import {MaterialResponse} from "../../../apisdk/sapdme_material";
import {db} from '../../../db';
import {ApiResponse} from "../../../dto/ApiResponse";
import {ISfcAssy} from "../../../db/models";

export abstract class AssemblyServices{
    static async getBOMInfoBySfc(plant: string , sfc: string): Promise<ComponentEntry>{
        let oCArray : InductionComponent[] = [];
        let componentsResponse : ComponentEntry =
            {order: '', orderQuantity: 0, bomQuantity: 0, components: oCArray};
        return await OrderApi.getSfcDetails(plant,sfc).then(async sfcResp => {
             return await OrderApi.getOrders(plant, sfcResp.order.order).then(async orderResp => {
                return await BomApi.getBom(orderResp.bom.bom, orderResp.plant, orderResp.bom.type).then(async oB => {
                    const mat = oB[0].components.map(async (item: BomComponent) => {
                        return await MaterialApi.getMaterialInfo(plant,item.material.material);
                    });
                    const materials = await Promise.all(mat);
                    const getMaterials= [].concat.apply([], materials);
                    for (let c of oB[0].components) {
                        let oC: InductionComponent = {
                            uom: "",
                            material: "",
                            materialDesc: "",
                            materialQty: 0,
                            theoreticQuantity: 0,
                            upperLimit: 0,
                            totalQuantity: 0,
                            tolerance: 1.10,
                            sumQty:0,
                            userDefQty:0,
                            userDeleteQty:0,
                            valueState: "Information",
                            valueMessage: "",
                            valueDeleteState: "Information",
                            valueDeleteMessage: ""
                        };
                        let foundMaterial : MaterialResponse = getMaterials.filter((f:MaterialResponse) => {return f.material == c.material.material});
                        if (c.customValues != undefined)
                            oC.tolerance = Number(c.customValues.filter((x: CustomValue) => {
                                if (x.attribute == "TOLERANCE")
                                    return x.value;
                            }));
                        if (oC.tolerance == 0)
                            oC.tolerance = 1.10;
                        oC.materialDesc = foundMaterial[0].description;
                        oC.materialQty = c.quantity;
                        oC.theoreticQuantity = c.totalQuantity;
                        oC.upperLimit = oC.tolerance * oC.theoreticQuantity;
                        oC.uom = c.unitOfMeasure;
                        oC.material = c.material.material;

                        oCArray.push(oC);
                    }

                    componentsResponse.orderQuantity = orderResp.releasedQuantity;
                    componentsResponse.order = orderResp.order;
                    componentsResponse.bomQuantity = Number(oB[0].customValues.filter((a: CustomValue)=> {return a.attribute == "BOM_QUANTITY"})[0].value);
                    componentsResponse.components = oCArray;
                    return componentsResponse;
                });
            });
        });



    }

    static async saveInductionComponents(sfcBo: string,shopOrderBo: string, operationBo: string, resourceBo: string,prodMaterialBo: string,objectData: InductionComponent[], plant: string, userId: string):Promise<ApiResponse>{
        let resp :ApiResponse= {
            data: "",
            message: "",
            status: 200
        }
        try{
            let messageString :string = "";
            for(let c of objectData )
            {
                let a : ISfcAssy =await db.sfcAssy.add(sfcBo, shopOrderBo, resourceBo, operationBo, prodMaterialBo, c.userDefQty, c.material, userId);
                messageString += " -Material: "+ c.material + " Quantity: " + a.qty;
            }
        resp.data = "Bileşen Girişi tamamlandı SFC:" + sfcBo + messageString;
        resp.message= "Success";
        }catch (e :any) {
            resp.data = e.toString();
            resp.message = "Error";
            resp.status = 500;
        }

        return await resp;
    }
}