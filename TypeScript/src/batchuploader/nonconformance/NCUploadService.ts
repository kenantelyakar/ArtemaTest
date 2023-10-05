import {ApiResponse} from "../../dto/ApiResponse";
import {NCBatchUpload} from "../../dto/batchUpload/NCBatchUpload";
import {NonconformanceCodeApi, NonConformanceCodeV2} from "../../apisdk/sapdme_nonconformancecode";
import {NCCodeApi} from "../../srv/NCCodeApi";

export abstract class NCUploadService {
    static async uploadBatch(data: NCBatchUpload[]): Promise<ApiResponse> {
        let apiResp = new ApiResponse();
        try {
            let row : Object ={
                status : data[0].NCStatus,
                code : data[0].NCCode,
                description : data[0].NCDescription,
                category: data[0].NCCategory,
                plant : data[0].plant
            };
           // let serviceResponse = await NonconformanceCodeApi.createUsingPost({row}).execute({destinationName:'DMC_OAuth'});
            apiResp = await NCCodeApi.createNCCode(row);;
        }catch (e: any){
            apiResp.data = e.toString();
            apiResp.message = "Error";
            apiResp.status = 500;
        }
        return apiResp;
    }
}