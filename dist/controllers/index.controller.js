"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
exports.getUsers = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "TOMATE"."Vista_cosecha_calidad"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getUserbyId = async (req, res) => {
    console.log(req.params.id);
    res.send('received');
    /*
    try {
        const Response= await pool.query('SELECT * FROM "TOMATE"."Vista_cosecha_calidad"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Error interno bd')
    }
    */
};
exports.createUser = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "TOMATE"."Vista_cosecha_calidad"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.updataUser = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "TOMATE"."Vista_cosecha_calidad"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
