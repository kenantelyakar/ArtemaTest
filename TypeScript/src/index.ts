import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import AxiosCaller from "./util/AxiosCaller";
import {ApiType} from "./enum/ApiType";
import {RequestType} from "./enum/RequestType";

var PORT = process.env.PORT || 8088;

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {
    const response = await AxiosCaller.callDMCDestination(ApiType.ORDER, "/orders",RequestType.GET, {
        plant:"PP01",
        order:"100634"
    });
    res.send(response);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
});