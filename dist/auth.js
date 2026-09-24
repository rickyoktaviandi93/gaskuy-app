"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
exports.auth = auth;
exports.role = role;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = () => process.env.JWT_SECRET || 'dev-only';
const sign = (id, role) => jsonwebtoken_1.default.sign({ sub: id, role }, secret(), { expiresIn: '7d' });
exports.sign = sign;
function auth(req, res, next) { try {
    const h = req.headers.authorization || '';
    req.user = jsonwebtoken_1.default.verify(h.startsWith('Bearer ') ? h.slice(7) : '', secret());
    next();
}
catch {
    res.status(401).json({ message: 'Unauthorized' });
} }
function role(...roles) { return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'Forbidden' }); }
