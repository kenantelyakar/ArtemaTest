"use strict";
const RequestType_1 = require("../enum/RequestType");
const cfAxios = require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static callDMCDestination(apiType, method, reqType, params) {
        let apiResponse;
        if (reqType == RequestType_1.RequestType.GET) {
            const searchParams = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
            return dmcAxios.get(apiType + method + "?" + searchParams)
                .then((value) => {
                apiResponse.status = value.status;
                apiResponse.data = value.data;
                apiResponse.message = value.statusText;
                return apiResponse;
            })
                .catch((err) => {
                apiResponse.status = Number(err.status);
                apiResponse.data = err.toJSON();
                apiResponse.message = err.message;
                return apiResponse;
            });
        }
        if (reqType == RequestType_1.RequestType.POST) {
            return dmcAxios.post((apiType + method), params)
                .then((value) => {
                apiResponse.status = value.status;
                apiResponse.data = value.data;
                apiResponse.message = value.statusText;
                return apiResponse;
            })
                .catch((err) => {
                apiResponse.status = err.status;
                apiResponse.data = err.toJSON();
                apiResponse.message = err.message;
                return apiResponse;
            });
        }
        return dmcAxios;
    }
}
module.exports = AxiosCaller;
