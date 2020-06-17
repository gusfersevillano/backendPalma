"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.signup = async (req, res) => {
    const telefono = req.body.Telefono;
    const telefonoExists = await database_1.pool.query('SELECT *FROM "PALMA"."Usuarios" where "Telefono" = $1', [telefono]);
    //console.log(telefonoExists.rowCount);
    if (telefonoExists.rowCount > 0) {
        return res.status(400).json('este teléfono ya existe');
    }
    // Saving a new User
    try {
        const { Nombre, Telefono, Rol, Clave, Estado } = (req.body);
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.Clave, salt);
        //console.log(salt);
        //console.log(hash);
        const id_u = await database_1.pool.query('SELECT max("Id_usuarios") FROM "PALMA"."Usuarios";');
        const _id = id_u.rows[0].max + 1;
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Usuarios"("Id_usuarios", "Nombre", "Telefono", "Rol", "Clave", "Estado") VALUES ($1, $2, $3, $4, $5, $6)', [id_u.rows[0].max + 1, Nombre, Telefono, Rol, hash, Estado]);
        const token = jsonwebtoken_1.default.sign({ Id_usuarios: _id }, process.env.TOKEN_SECRET || 'tokentess', {
            expiresIn: 60 * 60 * 24
        });
        res.json({ auth: true, token });
        //res.header('auth-token', token).json(token);
        // res.header('auth-token', token).json(savedUser);
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.signin = async (req, res) => {
    const Telefono = req.body.Telefono;
    const Clave = req.body.Clave;
    const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Usuarios" where "Telefono" = $1', [Telefono]);
    console.log(Response.rowCount);
    if (Response.rowCount == 0) {
        return res.status(400).json('teléfono o contraseña invalidos');
    }
    var matched = bcryptjs_1.default.compareSync(Clave, Response.rows[0].Clave);
    if (!matched)
        return res.status(400).json('contraseña invalida');
    // Create a Token
    const token = jsonwebtoken_1.default.sign({ Id_usuarios: Response.rows[0].Id_usuarios }, process.env.TOKEN_SECRET || 'tokentess', {
        expiresIn: 60 * 60 * 24
    });
    // res.json(user);
    res.header('auth-token', token).json(Response.rows);
};
/*
export const datoUsuario = async (req: Request, res: Response) => {
       console.log(req.body.idv);
    const user = await User.findOne({ _id: req.body.idv });

  res.json(user);
};

*/
/*

export const profile = async (req: Request, res: Response) => {
        //console.log(req.header('auth-token'));
        //res.send('profec');
        const _id = '5dad12f42d47cc12c4d09263';
    //const _ids= req.body.emal;
    //console.log(req.body.email);
   
   const user = await User.findById(_id, { password: 0 });
    if (!user) {
        return res.status(404).json('Usario no encontrado');
    }
    console.log(user);
    
};
*/ 
