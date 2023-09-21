import {ApiResponse} from "../dto/ApiResponse";
import {AxiosError, AxiosResponse} from "sap-cf-axios";
import {ApiType} from "../enum/ApiType";
import {RequestType} from "../enum/RequestType";

const cfAxios =require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static async callDMC(apiType: ApiType, method: string, reqType: RequestType, params: Object): Promise<any> {
        if (reqType == RequestType.GET) {
            const searchParams = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
            return dmcAxios.get(apiType+method+"?"+searchParams)
                .then(function (value: AxiosResponse) {return value.data;})
                .catch(catchError)
            function catchError(err: any) {
                let resp: ApiResponse;
                if (err instanceof AxiosError) {
                    resp = {
                        status: err.status,
                        data: err,
                        message: err.message
                    };
                    return resp;
                }}
        } else if (RequestType.POST || RequestType.PUT || RequestType.PATCH) {
            return await dmcAxios.post((apiType + method), params)
                .then(function (value: AxiosResponse) {
                    return value.data;
                })
                .catch(catchError)
            function catchError(err: any) {
                let resp: ApiResponse;
            if (err instanceof AxiosError) {
                resp = {
                    status: err.status,
                    data: err,
                    message: err.message
                };
                return resp;
            }
        }

            return await dmcAxios;
        }
    }

}
export = AxiosCaller;
