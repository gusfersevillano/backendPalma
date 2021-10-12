import { Pool } from 'pg';

/*
export const pool = new Pool({
    host: 'us11.acugis-dns.com',
    port: 5432,
    user: 'geobigda',
    password: '290ygoZ5Fa',
    database: 'geobigda_tecnisoil01',
});*/


export const pool = new Pool({
    host: '198.211.101.74',
    port: 5432,
    user: 'postgres',
    password: 'palma1234',
    database: 'Tecnisoil',
});

