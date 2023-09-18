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
const RequestType_1 = require("../enum/RequestType");
const cfAxios = require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static callDMCDestination(apiType, method, reqType, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (reqType == RequestType_1.RequestType.GET) {
                const searchParams = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
                return yield dmcAxios({
                    url: apiType + method + "?" + searchParams,
                    method: "get",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                    .then((value) => {
                    let resp = {
                        status: value.status,
                        data: value.data,
                        message: value.statusText
                    };
                    return resp;
                })
                    .catch((err) => {
                    let resp = {
                        status: err.status,
                        data: err,
                        message: err.message
                    };
                    return resp;
                });
            }
            if (reqType == RequestType_1.RequestType.POST) {
                return yield dmcAxios.post((apiType + method), params)
                    .then((value) => {
                    let resp = {
                        status: value.status,
                        data: value.data,
                        message: value.statusText
                    };
                    return resp;
                })
                    .catch((err) => {
                    let resp = {
                        status: err.status,
                        data: err,
                        message: err.message
                    };
                    return resp;
                });
            }
            return yield dmcAxios;
        });
    }
}
module.exports = AxiosCaller;
