"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const realtime_1 = require("./realtime");
const server = http_1.default.createServer(app_1.default);
(0, realtime_1.setupRealtime)(server);
server.listen(Number(process.env.PORT || 3000), () => console.log('GasKuy API ready'));
