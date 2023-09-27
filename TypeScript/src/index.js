"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AssemblyServices_1 = require("./induction/component/impl/AssemblyServices");
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get('/getBomBySfc', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    let plant = req.query.plant;
    let sfc = req.query.sfc;
    AssemblyServices_1.AssemblyServices.getBOMInfoBySfc(plant, sfc).then((v) => {
        res.json(v);
    }).catch(err => next(err));
});
app.post('/saveInductionComponents', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    let component = req.body.componentsList;
    let plant = req.body.site;
    let user = req.body.insUser;
    let sfc = req.body.sfc;
    let shopOrder = req.body.shopOrder;
    let operation = req.body.operation;
    let resource = req.body.resource;
    let material = req.body.resource;
    AssemblyServices_1.AssemblyServices.saveInductionComponents(sfc, shopOrder, operation, resource, material, component, plant, user).then((v) => {
        res.json(v);
    }).catch(err => next(err));
});
app.get('/createTables', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    db_1.db.sfcAssy.create();
    res.json({
        message: "success"
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
});
