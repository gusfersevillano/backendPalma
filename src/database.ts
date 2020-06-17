import { Pool } from 'pg';

export const pool = new Pool({
    host: 'us11.acugis-dns.com',
    port: 5432,
    user: 'geobigda',
    password: '290ygoZ5Fa',
    database: 'geobigda_tecnisoil01',
});

