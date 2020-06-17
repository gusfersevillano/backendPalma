"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const app = express_1.default();
//setting
app.set('port', process.env.PORT || 3000);
//middleware
app.use(morgan_1.default('dev')); // para ver lineas por consola
app.use(express_1.default.json()); //convierte los datos a un archivo json
app.use(express_1.default.urlencoded({ extended: false })); // permite  convertie datos de un formulario a json
//routes
app.use('/api', index_1.default);
// este folder para esta aplicación será almecenado para archivos públics
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
exports.default = app;
