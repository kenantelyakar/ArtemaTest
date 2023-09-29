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
            return await dmcAxios.get(apiType+method+"?"+searchParams)
                .then(async function (value: AxiosResponse) {return await value.data;})
                .catch(catchError)
            function catchError(err: any) {
                let resp: ApiResponse = new ApiResponse();
                if (err instanceof AxiosError) {
                    resp.status = 500;
                    resp.data = err;
                    resp.message = err.message;
                }
                else {
                    resp.status = 500;
                    resp.data = "Unknown error: Axioscaller: 24";
                    resp.message = "Error";
                }
                return resp;
            }
        }
        else if (RequestType.POST || RequestType.PUT || RequestType.PATCH) {
            return await dmcAxios.post((apiType + method), params)
                .then(function (value: AxiosResponse) {
                    return value.data;
                })
                .catch(catchErrorPost)
            function catchErrorPost(err: any) {
                let resp: ApiResponse = new ApiResponse();
                if (err instanceof AxiosError) {
                    resp.status = 500;
                    resp.data = err;
                    resp.message = err.message;
                }
                else {
                    resp.status = 500;
                    resp.data = "Unknown error: Axioscaller: 45";
                    resp.message = "Error";
                }
                return resp;
            }
        }
    }

}
export = AxiosCaller;
