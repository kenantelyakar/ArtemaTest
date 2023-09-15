import {ApiResponse} from "../dto/ApiResponse";
import {AxiosResponse} from "sap-cf-axios";
import {ApiType} from "../enum/ApiType";
import {RequestType} from "../enum/RequestType";
const cfAxios =require('sap-cf-axios').default;
const dmcAxios = cfAxios("DMC_OAuth");
class AxiosCaller {
    static callDMCDestination(apiType: ApiType, method: string, reqType: RequestType, params: Object):ApiResponse {
        let apiResponse : ApiResponse;
        return dmcAxios({
            method: reqType,
            url: apiType + method,
            data: params,
            xsrfHeaderName: "x-csrf-token"
        })
            .then((value: AxiosResponse) => {
            apiResponse.status = value.status;
            apiResponse.data = value.data;
            apiResponse.message = value.statusText;
            return apiResponse;
        })
            .catch((err:any)=>{
                console.log(err);
            })
    }


}
export = AxiosCaller;
