import { Request, Response } from 'express'
import {QueryResult} from 'pg'
import {pool} from '../database'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {getUsers, getUserbyId, createUser, deleteUser, updataUser} from '../controllers/index.controller';


export const signup = async (req: Request, res: Response) => {
          
    const telefono= req.body.Telefono;
    const telefonoExists:QueryResult = await pool.query('SELECT *FROM "PALMA"."Usuarios" where "Telefono" = $1', [telefono])
        //console.log(telefonoExists.rowCount);
    
    if (telefonoExists.rowCount > 0) {
      return res.status(400).json('este teléfono ya existe');
    }

    // Saving a new User
    // alsdfjlasdjfl  
    //modificacion
    //este es parafo creado desde pruebagit

    //este es párrafo creado desde prueba2git
  
    try {
      const {Nombre, Telefono, Rol, Clave, Estado }=(req.body);

          var bcrypt = require('bcryptjs');
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.Clave, salt);
          //console.log(salt);
          //console.log(hash);

          const id_u:QueryResult = await pool.query('SELECT max("Id_usuarios") FROM "PALMA"."Usuarios";')
          const _id= id_u.rows[0].max+1;
          const Response:QueryResult = await pool.query('INSERT INTO "PALMA"."Usuarios"("Id_usuarios", "Nombre", "Telefono", "Rol", "Clave", "Estado") VALUES ($1, $2, $3, $4, $5, $6)', 
            [id_u.rows[0].max+1, Nombre, Telefono, Rol, hash, Estado]
            );
  
        const token: string = jwt.sign({ Id_usuarios: _id }, process.env.TOKEN_SECRET || 'tokentess', {
           expiresIn: 60 * 60 * 24
        });

         res.json({ auth: true, token });

        //res.header('auth-token', token).json(token);
       // res.header('auth-token', token).json(savedUser);

    } catch (e) {
        res.status(400).json(e);
    }


};



export const signin = async (req: Request, res: Response) => {

    const Telefono= req.body.Telefono;
    const Clave=req.body.Clave;

    const Response: QueryResult = await pool.query('SELECT *FROM "PALMA"."Usuarios" where "Telefono" = $1', [Telefono]);
   
   console.log(Response.rowCount) ;

   
    if (Response.rowCount==0) {
      return res.status(400).json('teléfono o contraseña invalidos');
    }
  
    var matched = bcrypt.compareSync(Clave, Response.rows[0].Clave);
   
  
    if (!matched) return res.status(400).json('contraseña invalida');

    // Create a Token
    const token: string = jwt.sign({Id_usuarios: Response.rows[0].Id_usuarios}, process.env.TOKEN_SECRET || 'tokentess', {
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