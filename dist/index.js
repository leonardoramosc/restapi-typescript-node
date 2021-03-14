"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = express_1.default();
const port = 4000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(index_1.default);
app.listen(port, () => {
    console.log('server on port', port);
});
