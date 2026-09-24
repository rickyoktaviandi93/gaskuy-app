"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("./db");
const r = (0, express_1.Router)();
r.get('/', async (_req, res) => { try {
    await db_1.pool.query('SELECT 1');
    res.json({ ok: true, db: true, service: 'gaskuy-api' });
}
catch {
    res.status(503).json({ ok: false, db: false });
} });
exports.default = r;
