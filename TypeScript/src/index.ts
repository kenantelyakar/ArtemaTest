import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import {AssemblyServices} from "./induction/component/impl/AssemblyServices";
import {ComponentEntry} from "./dto/induction/component/ComponentEntry";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.get('/getBomBySfc', (req: Request, res: Response, next :NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    let plant  = req.query.plant as string;
    let sfc    = req.query.sfc as string;
    AssemblyServices.getBOMInfoBySfc(plant,sfc).then((v: void| ComponentEntry)=>{
            res.json(v);
    }).catch(err => next(err));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
});
