import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import {AssemblyServices} from "./induction/component/impl/AssemblyServices";
import {ComponentEntry} from "./dto/induction/component/ComponentEntry";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;


app.get('/getBom', (req: Request, res: Response, next :NextFunction) => {
    let plant  = req.query.plant as string;
    let order  = req.query.order as string;
    AssemblyServices.getBOMInfoByShopOrder(plant,order).then((v: ComponentEntry)=>{
        res.json(v);
    }).catch(err => next(err));

});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
});
