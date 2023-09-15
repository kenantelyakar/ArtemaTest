"use strict";
const cfAxios = require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static callDMCDestination(apiType, method, reqType, params) {
        let apiResponse;
        return dmcAxios({
            method: reqType,
            url: apiType + method,
            data: params,
            xsrfHeaderName: "x-csrf-token"
        })
            .then((value) => {
            apiResponse.status = value.status;
            apiResponse.data = value.data;
            apiResponse.message = value.statusText;
            return apiResponse;
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
module.exports = AxiosCaller;
