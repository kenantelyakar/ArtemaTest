"use strict";
const sap_cf_axios_1 = require("sap-cf-axios");
const RequestType_1 = require("../enum/RequestType");
const cfAxios = require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static async callDMC(apiType, method, reqType, params) {
        if (reqType == RequestType_1.RequestType.GET) {
            const searchParams = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
            return await dmcAxios.get(apiType + method + "?" + searchParams)
                .then(async function (value) { return await value.data; })
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
            return await dmcAxios.post((apiType + method), params)
                .then(function (value) {
                return value.data;
            })
                .catch(catchErrorPost);
            function catchErrorPost(err) {
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
    }
}
module.exports = AxiosCaller;
