import http from 'http';
import AxiosCaller from "./util/AxiosCaller";
import {ApiType} from "./enum/ApiType";
import {RequestType} from "./enum/RequestType";

var PORT = process.env.PORT || 8088;

export const server = http.createServer((req,res) =>{
    let responseData = AxiosCaller.callDMCDestination(ApiType.ORDER, "/orders",RequestType.GET, {
        plant:"PP01",
        order:"100634"
    })
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({
         data:responseData.data
    }))
})

server.listen(PORT, ()=>{
    console.log("Server runnindg on " + PORT);
})
