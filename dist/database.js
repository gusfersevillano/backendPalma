"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: 'us11.acugis-dns.com',
    port: 5432,
    user: 'geobigda',
    password: '290ygoZ5Fa',
    database: 'geobigda_tecnisoil01',
});
