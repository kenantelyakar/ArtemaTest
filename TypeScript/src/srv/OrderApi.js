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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderApi = void 0;
const AxiosCaller_1 = __importDefault(require("../util/AxiosCaller"));
const ApiType_1 = require("../enum/ApiType");
const RequestType_1 = require("../enum/RequestType");
class OrderApi {
    static getOrders(plant, order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AxiosCaller_1.default.callDMC(ApiType_1.ApiType.ORDER, "/orders", RequestType_1.RequestType.GET, {
                plant: plant,
                order: order
            });
        });
    }
    ;
    static getSfcDetails(plantReq, sfcReq) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryParameters = {
                plant: plantReq,
                sfc: sfcReq
            };
            return yield AxiosCaller_1.default.callDMC(ApiType_1.ApiType.SFC, "/sfcdetail", RequestType_1.RequestType.GET, queryParameters);
        });
    }
    ;
}
exports.OrderApi = OrderApi;
