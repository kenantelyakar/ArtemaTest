import {BOM, CustomValue} from "../../../apisdk/sapdme_bom";
import {BomApi} from "../../../srv/BomApi";
import {OrderApi} from "../../../srv/OrderApi";
import {ComponentEntry} from "../../../dto/induction/component/ComponentEntry";
import {InductionComponent} from "../../../dto/induction/component/InductionComponent";

export abstract class AssemblyServices{
    static async getBOMInfoByShopOrder(plant: string , order: string): Promise<ComponentEntry>{
        return await OrderApi.getOrders(plant,order)
        .then(async oI=>{
            let oCArray :InductionComponent[] =[];
            let componentsResponse :ComponentEntry={
                order:"",
                orderQuantity: 0,
                bomQuantity:1000,
                components: oCArray
            };
            let oB : BOM[];
            oB = await BomApi.getBom(oI.bom.bom,oI.plant,oI.bom.type);
            for(let c of oB[0].components){
               let oC: InductionComponent = {
                    uom:"",
                    material:"",
                    materialQty:0,
                    theoreticQuantity:0,
                    upperLimit:0,
                    totalQuantity:0,
                    tolerance:1.10
                };
                if(c.customValues != undefined)
                    oC.tolerance = Number(c.customValues.filter((x:CustomValue)=>{
                        if(x.attribute == "TOLERANCE")
                           return x.value;
                    }));
                if(oC.tolerance == 0)
                    oC.tolerance = 1.10;
                oC.materialQty = c.quantity;
                oC.theoreticQuantity = c.totalQuantity;
                oC.upperLimit = oC.tolerance * oC.theoreticQuantity;
                oC.uom = c.unitOfMeasure;
                oC.material = c.material.material;

               oCArray.push(oC);
            }
            componentsResponse.orderQuantity = oI.releasedQuantity;
            componentsResponse.order = oI.order;
            componentsResponse.bomQuantity = Number(oB[0].customValues.filter((x:CustomValue)=>{
                if(x.attribute == "BOM_QTY")
                    return x.value;
            }));
            componentsResponse.components = oCArray;
            return componentsResponse;
        })
    }
}