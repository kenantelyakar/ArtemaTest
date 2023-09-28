"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssemblyServices = void 0;
const BomApi_1 = require("../../../srv/BomApi");
const OrderApi_1 = require("../../../srv/OrderApi");
const MaterialApi_1 = require("../../../srv/MaterialApi");
const db_1 = require("../../../db");
class AssemblyServices {
    static async getBOMInfoBySfc(plant, sfc) {
        let oCArray = [];
        let componentsResponse = { order: '', orderQuantity: 0, bomQuantity: 0, components: oCArray };
        return await OrderApi_1.OrderApi.getSfcDetails(plant, sfc).then(async (sfcResp) => {
            return await OrderApi_1.OrderApi.getOrders(plant, sfcResp.order.order).then(async (orderResp) => {
                return await BomApi_1.BomApi.getBom(orderResp.bom.bom, orderResp.plant, orderResp.bom.type).then(async (oB) => {
                    const mat = oB[0].components.map(async (item) => {
                        return await MaterialApi_1.MaterialApi.getMaterialInfo(plant, item.material.material);
                    });
                    const materials = await Promise.all(mat);
                    const getMaterials = [].concat.apply([], materials);
                    for (let c of oB[0].components) {
                        let oC = {
                            uom: "",
                            material: "",
                            materialDesc: "",
                            materialQty: 0,
                            theoreticQuantity: 0,
                            upperLimit: 0,
                            totalQuantity: 0,
                            tolerance: 1.10,
                            sumQty: 0,
                            userDefQty: 0,
                            userDeleteQty: 0,
                            valueState: "Information",
                            valueMessage: "",
                            valueDeleteState: "Information",
                            valueDeleteMessage: ""
                        };
                        let foundMaterial = getMaterials.filter((f) => { return f.material == c.material.material; });
                        if (c.customValues != undefined)
                            oC.tolerance = Number(c.customValues.filter((x) => {
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
                    componentsResponse.bomQuantity = Number(oB[0].customValues.filter((a) => { return a.attribute == "BOM_QUANTITY"; })[0].value);
                    componentsResponse.components = oCArray;
                    return componentsResponse;
                });
            });
        });
    }
    static async saveInductionComponents(sfcBo, shopOrderBo, operationBo, resourceBo, prodMaterialBo, objectData, plant, userId) {
        let resp = {
            data: "",
            message: "",
            status: 200
        };
        try {
            let messageString = "";
            for (let c of objectData) {
                let a = await db_1.db.sfcAssy.add(sfcBo, shopOrderBo, resourceBo, operationBo, prodMaterialBo, c.userDefQty, c.material, userId);
                messageString += " -Material: " + c.material + " Quantity: " + a.qty;
            }
            resp.data = "Bileşen Girişi tamamlandı SFC:" + sfcBo + messageString;
            resp.message = "Success";
        }
        catch (e) {
            resp.data = e.toString();
            resp.message = "Error";
            resp.status = 500;
        }
        return await resp;
    }
}
exports.AssemblyServices = AssemblyServices;
