"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const db_1 = require("./db");
const r = (0, express_1.Router)();
r.post('/', auth_1.auth, async (req, res) => { const { order_id, stars, comment } = req.body; if (!Number.isInteger(stars) || stars < 1 || stars > 5)
    return res.status(400).json({ message: 'Rating 1-5' }); const q = await db_1.pool.query(`SELECT driver_id,customer_id,status FROM orders WHERE id=$1 AND customer_id=$2`, [order_id, req.user.sub]); if (!q.rows[0] || q.rows[0].status !== 'COMPLETED')
    return res.status(400).json({ message: 'Order belum selesai' }); try {
    await db_1.pool.query('INSERT INTO ratings(order_id,customer_id,driver_id,stars,comment) VALUES($1,$2,$3,$4,$5)', [order_id, req.user.sub, q.rows[0].driver_id, stars, comment || null]);
    res.status(201).json({ ok: true });
}
catch {
    res.status(409).json({ message: 'Order sudah diberi rating' });
} });
exports.default = r;
