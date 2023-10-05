import AxiosCaller from "../util/AxiosCaller";
import {ApiType} from "../enum/ApiType";
import {RequestType} from "../enum/RequestType";
import type { BOM } from '../apisdk/sapdme_bom';
import {NonConformanceCodeV2} from "../apisdk/sapdme_nonconformancecode";
import {ApiResponse} from "../dto/ApiResponse";

export class NCCodeApi {
    static  async createNCCode(data: Object) : Promise<ApiResponse>{
        return await AxiosCaller.callDMC(ApiType.NC_CODE,"/nonconformancecodes",RequestType.POST, data);
    }
}