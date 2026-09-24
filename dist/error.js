"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.errorHandler = errorHandler;
function notFound(_req, res) { res.status(404).json({ message: 'Endpoint tidak ditemukan' }); }
function errorHandler(err, _req, res, _next) { console.error(err); res.status(500).json({ message: 'Terjadi kesalahan server' }); }
