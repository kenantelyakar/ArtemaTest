import {ApiResponse} from "../dto/ApiResponse";
import {AxiosError, AxiosResponse} from "sap-cf-axios";
import {ApiType} from "../enum/ApiType";
import {RequestType} from "../enum/RequestType";

const cfAxios =require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static async callDMCDestination(apiType: ApiType, method: string, reqType: RequestType, params: Object): Promise<ApiResponse> {
        if(reqType == RequestType.GET){
            const searchParams =  Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
            return await dmcAxios({
                url:apiType + method + "?" + searchParams,
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            })
                .then((value: AxiosResponse) => {
                    let resp :ApiResponse = {
                        status: value.status,
                        data : value.data,
                        message: value.statusText
                    };
                    return resp;
            })
                .catch((err:AxiosError)=>{
                    let resp :ApiResponse = {
                        status: err.status,
                        data : err,
                        message: err.message
                    };
                    return resp;
            })
        }
        if(reqType == RequestType.POST){
            return await dmcAxios.post((apiType + method),params)
                .then((value: AxiosResponse) => {
                    let resp :ApiResponse = {
                        status: value.status,
                        data : value.data,
                        message: value.statusText
                    };
                    return resp;
                })
                .catch((err:AxiosError)=>{
                    let resp :ApiResponse = {
                        status: err.status,
                        data : err,
                        message: err.message
                    };
                    return resp;
                })
        }

        return await dmcAxios;
    }


}
export = AxiosCaller;
