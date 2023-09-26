"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssemblyServices = void 0;
const BomApi_1 = require("../../../srv/BomApi");
const OrderApi_1 = require("../../../srv/OrderApi");
class AssemblyServices {
    static getBOMInfoBySfc(plant, sfc) {
        return __awaiter(this, void 0, void 0, function* () {
            let oCArray = [];
            let componentsResponse = { order: '', orderQuantity: 0, bomQuantity: 0, components: oCArray };
            return yield OrderApi_1.OrderApi.getSfcDetails(plant, sfc).then((sfcResp) => __awaiter(this, void 0, void 0, function* () {
                return yield OrderApi_1.OrderApi.getOrders(plant, sfcResp.order.order).then((orderResp) => __awaiter(this, void 0, void 0, function* () {
                    return yield BomApi_1.BomApi.getBom(orderResp.bom.bom, orderResp.plant, orderResp.bom.type).then((oB) => __awaiter(this, void 0, void 0, function* () {
                        for (let c of oB[0].components) {
                            let oC = {
                                uom: "",
                                material: "",
                                materialQty: 0,
                                theoreticQuantity: 0,
                                upperLimit: 0,
                                totalQuantity: 0,
                                tolerance: 1.10,
                                sumQty: 0,
                                userDefQty: 0,
                                userDeleteQty: 0
                            };
                            if (c.customValues != undefined)
                                oC.tolerance = Number(c.customValues.filter((x) => {
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
                        componentsResponse.bomQuantity = Number(oB[0].customValues.filter((x) => {
                            if (x.attribute == "BOM_QTY")
                                return x.value;
                        }));
                        componentsResponse.components = oCArray;
                        return componentsResponse;
                    }));
                }));
            }));
        });
    }
}
exports.AssemblyServices = AssemblyServices;
