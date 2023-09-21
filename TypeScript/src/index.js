"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AssemblyServices_1 = require("./induction/component/impl/AssemblyServices");
var PORT = process.env.PORT || 8088;
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/getBom', (req, res, next) => {
    let plant = req.query.plant;
    let order = req.query.order;
    AssemblyServices_1.AssemblyServices.getBOMInfoByShopOrder(plant, order).then((v) => {
        res.json(v);
    }).catch(err => next(err));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
});
