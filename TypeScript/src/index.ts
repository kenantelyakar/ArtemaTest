import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import {AssemblyServices} from "./induction/component/impl/AssemblyServices";
import {ComponentEntry} from "./dto/induction/component/ComponentEntry";
import {InductionComponent} from "./dto/induction/component/InductionComponent";
import {ApiResponse} from "./dto/ApiResponse";
import {db} from "./db";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(express.urlencoded({extended:false}));
app.use(express.json());

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
app.post('/saveInductionComponents',(req: Request, res: Response, next: NextFunction) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    let component = req.body.componentsList as InductionComponent[];
    let plant = req.body.site as string;
    let user = req.body.insUser as string;
    let sfc = req.body.sfc as string;
    let shopOrder  = req.body.shopOrder as string;
    let operation = req.body.operation as string;
    let resource = req.body.resource as string;
    let material = req.body.resource as string;
    AssemblyServices.saveInductionComponents(sfc,shopOrder,operation,resource,material,component,plant,user).then((v:ApiResponse)=>{
        res.json(v);
    }).catch(err=> next(err));
}) ;
app.get('/createTables',(req:Request, res:Response, next:NextFunction)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    db.sfcAssy.create();
    res.json({
        message:"success"
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
});
