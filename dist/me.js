"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const db_1 = require("./db");
const r = (0, express_1.Router)();
r.get('/', auth_1.auth, async (req, res) => { const q = await db_1.pool.query('SELECT id,name,phone,role,created_at FROM users WHERE id=$1', [req.user.sub]); res.json({ user: q.rows[0] }); });
exports.default = r;
