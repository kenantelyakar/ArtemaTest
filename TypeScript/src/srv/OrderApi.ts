import AxiosCaller from "../util/AxiosCaller";
import {ApiType} from "../enum/ApiType";
import {RequestType} from "../enum/RequestType";
import {FindOrderResponse} from "../apisdk/sapdme_order";

export class OrderApi{
    static async getOrders(plant: string |undefined, order: string |undefined): Promise<FindOrderResponse> {
        return await AxiosCaller.callDMC(ApiType.ORDER, "/orders", RequestType.GET, {
            plant: plant,
            order: order
        });
    };
}