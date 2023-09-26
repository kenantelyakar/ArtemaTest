"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AssemblyServices_1 = require("./induction/component/impl/AssemblyServices");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/getBomBySfc', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    let plant = req.query.plant;
    let sfc = req.query.sfc;
    AssemblyServices_1.AssemblyServices.getBOMInfoBySfc(plant, sfc).then((v) => {
        res.json(v);
    }).catch(err => next(err));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
});
