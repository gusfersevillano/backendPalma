"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: '198.211.101.74',
    port: 5432,
    user: 'postgres',
    password: 'palma1234',
    database: 'Tecnisoil',
});
/*
export const pool = new Pool({
    host: 'us11.acugis-dns.com',
    port: 5432,
    user: 'geobigda',
    password: '290ygoZ5Fa',
    database: 'geobigda_tecnisoil01',
});
*/ 
//# sourceMappingURL=database.js.map