import {ApiResponse} from "../dto/ApiResponse";
import {AxiosError, AxiosResponse} from "sap-cf-axios";
import {ApiType} from "../enum/ApiType";
import {RequestType} from "../enum/RequestType";

const cfAxios =require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static callDMCDestination(apiType: ApiType, method: string, reqType: RequestType, params: Object):ApiResponse {
        let apiResponse : ApiResponse;
        if(reqType == RequestType.GET){
            const searchParams =  Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
            return dmcAxios.get(apiType + method + "?" + searchParams)
                .then((value: AxiosResponse) => {
                apiResponse.status = value.status;
                apiResponse.data = value.data;
                apiResponse.message = value.statusText;
                return apiResponse;
            })
                .catch((err:AxiosError)=>{
                apiResponse.status = Number(err.status);
                apiResponse.data = err.toJSON();
                apiResponse.message = err.message;
                return apiResponse;
            })
        }
        if(reqType == RequestType.POST){
            return dmcAxios.post((apiType + method),params)
                .then((value: AxiosResponse) => {
                    apiResponse.status = value.status;
                    apiResponse.data = value.data;
                    apiResponse.message = value.statusText;
                    return apiResponse;
                })
                .catch((err:AxiosError)=>{
                    apiResponse.status = err.status;
                    apiResponse.data = err.toJSON();
                    apiResponse.message = err.message;
                    return apiResponse;
                })
        }

        return dmcAxios;
    }


}
export = AxiosCaller;
