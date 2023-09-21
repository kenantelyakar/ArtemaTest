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
const sap_cf_axios_1 = require("sap-cf-axios");
const RequestType_1 = require("../enum/RequestType");
const cfAxios = require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static callDMC(apiType, method, reqType, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (reqType == RequestType_1.RequestType.GET) {
                const searchParams = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
                return dmcAxios.get(apiType + method + "?" + searchParams)
                    .then(function (value) { return value.data; })
                    .catch(catchError);
                function catchError(err) {
                    let resp;
                    if (err instanceof sap_cf_axios_1.AxiosError) {
                        resp = {
                            status: err.status,
                            data: err,
                            message: err.message
                        };
                        return resp;
                    }
                }
            }
            else if (RequestType_1.RequestType.POST || RequestType_1.RequestType.PUT || RequestType_1.RequestType.PATCH) {
                return yield dmcAxios.post((apiType + method), params)
                    .then(function (value) {
                    return value.data;
                })
                    .catch(catchError);
                function catchError(err) {
                    let resp;
                    if (err instanceof sap_cf_axios_1.AxiosError) {
                        resp = {
                            status: err.status,
                            data: err,
                            message: err.message
                        };
                        return resp;
                    }
                }
                return yield dmcAxios;
            }
        });
    }
}
module.exports = AxiosCaller;
