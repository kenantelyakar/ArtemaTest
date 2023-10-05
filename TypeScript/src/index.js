"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AssemblyServices_1 = require("./induction/component/impl/AssemblyServices");
const db_1 = require("./db");
const XLSX = __importStar(require("xlsx"));
const formidable_1 = __importDefault(require("formidable"));
const NCUploadService_1 = require("./batchuploader/nonconformance/NCUploadService");
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
app.get('/checkInductionComponentEntry', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    let sfcBo = req.query.sfc;
    let operationBo = req.query.operation;
    let resourceBo = req.query.resource;
    AssemblyServices_1.AssemblyServices.checkInductionComponentEntry(sfcBo, operationBo, resourceBo).then((v) => {
        res.json(v);
    }).catch(err => next(err));
});
app.post('/saveInductionComponents', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    let params = JSON.parse(Object.keys(req.body)[0]).params;
    let component = params.componentsList;
    let plant = params.site;
    let user = params.insUser;
    let sfc = params.sfc;
    let shopOrder = params.shopOrder;
    let operation = params.operation;
    let resource = params.resource;
    let material = params.resource;
    AssemblyServices_1.AssemblyServices.saveInductionComponents(sfc, shopOrder, operation, resource, material, component, plant, user).then((v) => {
        res.json(v);
    }).catch(err => next(err));
});
app.post('/createNCCodesBatch', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    let params = JSON.parse(Object.keys(req.body)[0]).params;
    let component = params;
    NCUploadService_1.NCUploadService.uploadBatch(component).then((v) => {
        res.json(v);
    }).catch(err => next(err));
});
app.post('/getExcelToJson', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const form = (0, formidable_1.default)({});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        let excelBinary = files.myFileUpload;
        let wb;
        if (excelBinary) {
            // @ts-ignore
            wb = XLSX.readFile(excelBinary.path);
            wb.SheetNames.forEach(function (sheetName) {
                var oExcelRow = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]); // this is the required data in Object format
                var sJSONData = JSON.stringify(oExcelRow); // this is the required data in String format
                res.send(sJSONData);
            });
        }
    });
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
