"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./error");
const health_1 = __importDefault(require("./health"));
const auth_1 = require("./auth");
const me_1 = __importDefault(require("./me"));
const orders_1 = __importDefault(require("./orders"));
const drivers_1 = __importDefault(require("./drivers"));
const admin_1 = __importDefault(require("./admin"));
const ratings_1 = __importDefault(require("./ratings"));
const app = (0, express_1.default)();
const allowed = (process.env.CORS_ORIGIN || '').split(',').map(x => x.trim()).filter(Boolean);
app.use((0, cors_1.default)({ origin: (origin, cb) => {
        if (!origin || allowed.length === 0 || allowed.includes(origin))
            return cb(null, true);
        return cb(new Error('CORS blocked'));
    } }));
app.use(express_1.default.json({ limit: '1mb' }));
app.get('/health', health_1.default);
app.use('/api/v1/auth', auth_1.auth);
app.use('/api/v1/me', me_1.default);
app.use('/api/v1/orders', orders_1.default);
app.use('/api/v1/drivers', drivers_1.default);
app.use('/api/v1/admin', admin_1.default);
app.use('/api/v1/ratings', ratings_1.default);
app.use(error_1.errorHandler);
exports.default = app;
