"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = __importDefault(require("http"));
const AxiosCaller_1 = __importDefault(require("./util/AxiosCaller"));
const ApiType_1 = require("./enum/ApiType");
const RequestType_1 = require("./enum/RequestType");
var PORT = process.env.PORT || 8088;
exports.server = http_1.default.createServer((req, res) => {
    let responseData = AxiosCaller_1.default.callDMCDestination(ApiType_1.ApiType.ORDER, "/orders", RequestType_1.RequestType.GET, {
        plant: "PP01",
        order: "100634"
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        data: responseData.data
    }));
});
exports.server.listen(PORT, () => {
    console.log("Server runnindg on " + PORT);
});
