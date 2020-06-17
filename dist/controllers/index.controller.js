"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const database_1 = require("../database");
//usuario
exports.getUsers = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Usuarios"');
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
    const id = parseInt(req.params.id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Usuarios" where "Id_usuarios" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createUser = async (req, res) => {
    const { Nombre, Telefono, Rol, Clave, Estado } = (req.body);
    try {
        const id_u = await database_1.pool.query('SELECT max("Id_usuarios") FROM "PALMA"."Usuarios";');
        //console.log(id_u.rows[0].max);//el resultado es un json para acceder al [{max:2}]
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Usuarios"("Id_usuarios", "Nombre", "Telefono", "Rol", "Clave", "Estado") VALUES ($1, $2, $3, $4, $5, $6)', [id_u.rows[0].max + 1, Nombre, Telefono, Rol, Clave, Estado]);
        return res.status(200).json({ mensaje: "Usuario creado satisfactoriamente",
            body: {
                user: Nombre, Telefono, Rol, Clave, Estado
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.updataUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Nombre, Telefono, Rol, Clave, Estado } = (req.body);
    console.log(req.body);
    console.log(id);
    //console.log();
    try {
        const Response = await database_1.pool.query('UPDATE "PALMA"."Usuarios" SET "Nombre"=$1, "Telefono"=$2, "Rol"=$3, "Clave"=$4, "Estado"=$5 WHERE "Id_usuarios"=$6', [Nombre, Telefono, Rol, Clave, Estado, id]);
        return res.status(200).json(`El usuario: ${Nombre} actualizado satisfactoriamente `);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteUser = async (req, res) => {
    //console.log(req.params.id);	
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Usuarios" where "Id_usuarios" = $1', [id]);
        return res.status(200).json(`El usuario ${id} borrado satisfactoriamente `);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Fincas, ok revisado 
exports.getFincas = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Fincas"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getFincasbyId = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Fincas" where "Id_finca" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createFincas = async (req, res) => {
    const { Nombre, Programa, Estado } = (req.body);
    const nombre = req.body.Nombre;
    const nombreExists = await database_1.pool.query('SELECT *FROM "PALMA"."Fincas" where "Nombre" = $1', [nombre]);
    console.log(nombreExists.rowCount);
    if (nombreExists.rowCount > 0) {
        return res.status(400).json('esta finca ya existe');
    }
    try {
        const id_f = await database_1.pool.query('SELECT max("Id_finca") FROM "PALMA"."Fincas";');
        //console.log(id_u.rows[0].max);//el resultado es un json para acceder al [{max:2}]
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Fincas"("Id_finca", "Nombre", "Programa", "Estado") VALUES ($1, $2, $3, $4)', [id_f.rows[0].max + 1, Nombre, Programa, Estado]);
        return res.status(200).json({ mensaje: "Usuario creado satisfactoriamente",
            body: {
                user: Nombre, Programa, Estado
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.updataFincas = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Nombre, Programa, Estado } = (req.body);
    //console.log(req.body);
    //console.log(id);
    //console.log();
    //ojo esto poner solo si el nombre tiene en alguna tabla 
    /*
    const nombre= req.body.Nombre;
    const nombreExists:QueryResult = await pool.query('SELECT *FROM "PALMA"."Fincas" where "Nombre" = $1', [nombre])
    console.log(nombreExists.rowCount);

    if (nombreExists.rowCount > 0) {
        return res.status(400).json('esta finca ya existe');}
    */
    try {
        const Response = await database_1.pool.query('UPDATE "PALMA"."Fincas" SET "Nombre"=$1, "Programa"=$2, "Estado"=$3 WHERE "Id_finca"=$4', [Nombre, Programa, Estado, id]);
        return res.status(200).json(`Finca: ${Nombre} actualizada satisfactoriamente`);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteFincas = async (req, res) => {
    //console.log(req.params.id);	
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Fincas" where "Id_finca" = $1', [id]);
        return res.status(200).json(`La finca ${id} has sido borrada satisfactoriamente`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Tecnicosfincas , ok revisado todos
exports.getTecnicosfincas = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Tecnicosfincas"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getTecnicosfincasbyUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."V_tecnicosFincas" where "Id_usuarios" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getTecnicosfincasbyFinca = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."V_tecnicosFincas" where "Id_fincas" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getTecnicosfincasbyId = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Tecnicosfincas" where "Id_tecnicosfincas" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createTecnicosfincas = async (req, res) => {
    const { Id_usuarios, Id_fincas } = (req.body);
    try {
        const id_f = await database_1.pool.query('SELECT max("Id_tecnicosfincas") FROM "PALMA"."Tecnicosfincas";');
        //console.log(id_u.rows[0].max);//el resultado es un json para acceder al [{max:2}]
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Tecnicosfincas" ("Id_tecnicosfincas", "Id_usuarios", "Id_fincas") VALUES ($1, $2, $3)', [id_f.rows[0].max + 1, Id_usuarios, Id_fincas]);
        return res.status(200).json({ mensaje: "Usuario creado satisfactoriamente",
            body: {
                Tecnicosfincas: id_f.rows[0].max + 1, Id_usuarios, Id_fincas
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.updataTecnicosfincas = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Id_usuarios, Id_fincas } = (req.body);
    console.log(id, Id_usuarios, Id_fincas);
    //console.log(id);
    //console.log();
    try {
        const Response = await database_1.pool.query('UPDATE "PALMA"."Tecnicosfincas" SET "Id_usuarios"=$1, "Id_fincas"=$2 where "Id_tecnicosfincas"=$3', [Id_usuarios, Id_fincas, id]);
        return res.status(200).json(`Asignación correcta`);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteTecnicosfincas = async (req, res) => {
    console.log(req.params.id);
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Tecnicosfincas" where "Id_tecnicosfincas" = $1', [id]);
        return res.status(200).json(`La finca ${id} has sido borrada satisfactoriamente`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Producción, ok revisado todos 
exports.getProduccion = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Produccion"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getProduccionbyId = async (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Produccion" where "Id_produccion" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getProduccionbyFinca = async (req, res) => {
    const finca = parseInt(req.params.finca);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."V_produccion" where "Id_finca" = $1 order by "Fecha_produccion" desc limit 30', [finca]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createProduccion = async (req, res) => {
    const { Id_finca, Parcela, N_racimos, Fecha_produccion, Cortador, Pepero, Supervisor } = (req.body);
    try {
        const id_p = await database_1.pool.query('SELECT max("Id_produccion") FROM "PALMA"."Produccion";');
        //console.log(id_u.rows[0].max);//el resultado es un json para acceder al [{max:2}]
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Produccion" ("Id_produccion", "Id_finca", "Parcela", "N_racimos", "Fecha_produccion", "Cortador", "Pepero", "Supervisor") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [id_p.rows[0].max + 1, Id_finca, Parcela, N_racimos, Fecha_produccion, Cortador, Pepero, Supervisor]);
        return res.status(200).json({ mensaje: "Produccion Ingresada",
            body: {
                produccion: Id_finca, Parcela, N_racimos, Fecha_produccion, Cortador, Pepero, Supervisor
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.updataProduccion = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Id_finca, Parcela, N_racimos, Fecha_produccion, Cortador, Pepero, Supervisor } = (req.body);
    console.log(req.body);
    console.log(id);
    //console.log();
    try {
        const Response = await database_1.pool.query('UPDATE "PALMA"."Produccion" SET "Id_finca"=$1, "Parcela"=$2, "N_racimos"=$3, "Fecha_produccion"=$4, "Cortador"=$5, "Pepero"=$6, "Supervisor"=$7 WHERE "Id_produccion"=$8', [Id_finca, Parcela, N_racimos, Fecha_produccion, Cortador, Pepero, Supervisor, id]);
        return res.status(200).json(`Produccion actualizada `);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteProduccion = async (req, res) => {
    //console.log(req.params.id);	
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Produccion" where "Id_produccion" = $1', [id]);
        return res.status(200).json(`Borrado registro de produccion ${id}`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Control de calida, ok revisado todos  
exports.getCCalidad = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Calidad"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getCCalidadbyId = async (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Calidad" where "Id_calidad" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getCalidadbyFinca = async (req, res) => {
    const finca = parseInt(req.params.finca);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."V_calidad" where "Id_fincas" = $1 order by "Fecha_produccion" desc limit 30', [finca]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createCCalidad = async (req, res) => {
    const { Id_calidad, Id_finca, Parcela, Super_calidad, Fecha_produccion, Cortador, Porcentaje_verde, Porcentaje_podridos, Porcentaje_malformados } = (req.body);
    try {
        const id_c = await database_1.pool.query('SELECT max("Id_calidad") FROM "PALMA"."Calidad";');
        //console.log(id_c.rows[0].max);//el resultado es un json para acceder al [{max:2}]
        console.log(Id_finca);
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Calidad" ("Id_calidad", "Id_fincas", "Parcela", "Super_calidad", "Fecha_produccion", "Cortador", "Porcentaje_verde", "Porcentaje_podridos", "Porcentaje_malformados") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [id_c.rows[0].max + 1, Id_finca, Parcela, Super_calidad, Fecha_produccion, Cortador, Porcentaje_verde, Porcentaje_podridos, Porcentaje_malformados]);
        return res.status(200).json({ mensaje: "Calidad Ingresada",
            body: {
                produccion: Id_calidad, Id_finca, Parcela, Super_calidad, Fecha_produccion, Cortador, Porcentaje_verde, Porcentaje_podridos, Porcentaje_malformados
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.updataCCalidad = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Id_calidad, Id_fincas, Parcela, Super_calidad, Fecha_produccion, Cortador, Porcentaje_verde, Porcentaje_podridos, Porcentaje_malformados } = (req.body);
    //console.log(req.body);
    //console.log(id);
    //console.log();
    try {
        const Response = await database_1.pool.query('UPDATE "PALMA"."Calidad" SET "Id_fincas"=$1, "Parcela"=$2, "Super_calidad"=$3, "Fecha_produccion"=$4, "Cortador"=$5, "Porcentaje_verde"=$6, "Porcentaje_podridos"=$7, "Porcentaje_malformados"=$8 WHERE "Id_calidad"=$9', [Id_fincas, Parcela, Super_calidad, Fecha_produccion, Cortador, Porcentaje_verde, Porcentaje_podridos, Porcentaje_malformados, id]);
        return res.status(200).json(`Control actualizado`);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteCCalidad = async (req, res) => {
    //console.log(req.params.id);	
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Calidad" where "Id_calidad" = $1', [id]);
        return res.status(200).json(`Borrado registro de calidad: ${id}`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Fitosanitario, ok revisado todos  
exports.getFitosanitario = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Fitosanitario"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getFitosanitariobyId = async (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Fitosanitario" where "Id_fitosanitario" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getFitosanitariobyFinca = async (req, res) => {
    const finca = parseInt(req.params.finca);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."V_fitosanitario" where "Id_finca" = $1 order by "Fecha_fitosanitario" desc limit 30', [finca]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createFitosanitario = async (req, res) => {
    const { Id_finca, Parcela, Hileraterraza, Id_arbol, Arbol, Fecha_fitosanitario, Erradicada, Enfermedad, TecnicoResponsable } = (req.body);
    try {
        const id_c = await database_1.pool.query('SELECT max("Id_fitosanitario") FROM "PALMA"."Fitosanitario";');
        console.log(id_c.rows[0].max); //el resultado es un json para acceder al [{max:2}]
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Fitosanitario" ("Id_fitosanitario", "Id_finca", "Parcela", "HileraTerraza", "Id_arbol", "Arbol", "Fecha_fitosanitario", "Erradicada", "Enfermedad", "TecnicoResponsable") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id_c.rows[0].max + 1, Id_finca, Parcela, Hileraterraza, Id_arbol, Arbol, Fecha_fitosanitario, Erradicada, Enfermedad, TecnicoResponsable]);
        return res.status(200).json({ mensaje: "Registro fitosanitario ingresado",
            body: {
                produccion: Id_finca, Parcela, Hileraterraza, Id_arbol, Arbol, Fecha_fitosanitario, Erradicada, Enfermedad, TecnicoResponsable
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.updataFitosanitario = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Id_finca, Parcela, HileraTerraza, Id_arbol, Arbol, Fecha_fitosanitario, Erradicada, Enfermedad, TecnicoResponsable } = (req.body);
    //console.log(req.body);
    //console.log(id);
    //console.log();
    //const tabla='UPDATE "PALMA"."Fitosanitario" SET "Id_finca"=$1, "Parcela"=$2, "HileraTerraza"=$3, "Id_arbol"=$4, "Arbol"=$5, "Fecha_fitosanitario"=$6, "Erradicada"=$7, "Enfermedad"=$8,  "TecnicoResponsable"=$9 WHERE "Id_fitosanitario"=$10';
    //console.log(tabla);
    try {
        const Response = await database_1.pool.query('UPDATE "PALMA"."Fitosanitario" SET "Id_finca"=$1, "Parcela"=$2, "HileraTerraza"=$3, "Id_arbol"=$4, "Arbol"=$5, "Fecha_fitosanitario"=$6, "Erradicada"=$7, "Enfermedad"=$8,  "TecnicoResponsable"=$9 WHERE "Id_fitosanitario"=$10', [Id_finca, Parcela, HileraTerraza, Id_arbol, Arbol, Fecha_fitosanitario, Erradicada, Enfermedad, TecnicoResponsable, id]);
        return res.status(200).json(`Fitosanitario actualizado`);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteFitosanitario = async (req, res) => {
    //console.log(req.params.id);	
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Fitosanitario" where "Id_fitosanitario" = $1', [id]);
        return res.status(200).json(`Borrado registro fitosanitario: ${id}`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Fotos_Calidad, ok todo no existe update porque le elimina o se crea
exports.getFotoC = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Foto_foto_C"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getFotoCbyId = async (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Foto_foto_C" where "Id_foto_C" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createFotoC = async (req, res) => {
    const { Id_calidad } = (req.body);
    const path2 = (req.file.path);
    //console.log(req.body);
    //return res.json({messaje: 'foto grabada satisfactoriamente'})
    try {
        const id_c = await database_1.pool.query('SELECT max("Id_foto_C") FROM "PALMA"."Foto_foto_C";');
        console.log(id_c.rows[0].max); //el resultado es un json para acceder al [{max:2}]
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Foto_foto_C" ("Id_foto_C", "Id_calidad", "Foto_f") VALUES ($1, $2, $3)', [id_c.rows[0].max + 1, Id_calidad, req.file.path]);
        return res.status(200).json({ mensaje: "Calidad Ingresada",
            body: {
                produccion: Id_calidad, path2
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteFotoC = async (req, res) => {
    //console.log(req.params.id);	
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response1 = await database_1.pool.query('SELECT *FROM "PALMA"."Foto_foto_C" where "Id_foto_C" = $1', [id]);
        //console.log(Response1.rows[0].Foto_f);
        if (Response1) {
            await fs_extra_1.default.unlink(path_1.default.resolve(Response1.rows[0].Foto_f));
        }
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Foto_foto_C" where "Id_foto_C" = $1', [id]);
        return res.status(200).json(`Borrado registro de fotoC: ${id}`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Foto_foto_F, ok todo no existe update porque le elimina o se crea
exports.getFotoF = async (req, res) => {
    try {
        const Response = await database_1.pool.query('SELECT * FROM "PALMA"."Foto_foto_F"');
        return res.status(200).json(Response.rows);
        //console.log(Response.rows);
        //res.send('users')		
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.getFotoFbyId = async (req, res) => {
    const id = parseInt(req.params.id);
    //console.log(id);
    try {
        //console.log(id);
        const Response = await database_1.pool.query('SELECT *FROM "PALMA"."Foto_foto_F" where "Id_foto_F" = $1', [id]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.createFotoF = async (req, res) => {
    const { Id_fitosanitario } = (req.body);
    const path1 = (req.file.path);
    //console.log(req.body);
    //return res.json({messaje: 'foto grabada satisfactoriamente'})
    try {
        const id_c = await database_1.pool.query('SELECT max("Id_foto_F") FROM "PALMA"."Foto_foto_F";');
        console.log(id_c.rows[0].max); //el resultado es un json para acceder al [{max:2}]
        const Response = await database_1.pool.query('INSERT INTO "PALMA"."Foto_foto_F" ("Id_foto_F", "Id_fitosanitario", "Foto_f") VALUES ($1, $2, $3)', [id_c.rows[0].max + 1, Id_fitosanitario, req.file.path]);
        return res.status(200).json({ mensaje: "Calidad Ingresada",
            body: {
                produccion: Id_fitosanitario, path1
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
exports.deleteFotoF = async (req, res) => {
    //console.log(req.params.id);	
    //return res.send('deleting');
    const id = parseInt(req.params.id);
    try {
        const Response1 = await database_1.pool.query('SELECT *FROM "PALMA"."Foto_foto_F" where "Id_foto_F" = $1', [id]);
        //console.log(Response1.rows[0].Foto_f);
        if (Response1) {
            await fs_extra_1.default.unlink(path_1.default.resolve(Response1.rows[0].Foto_f));
        }
        const Response = await database_1.pool.query('DELETE FROM "PALMA"."Foto_foto_F" where "Id_foto_F" = $1', [id]);
        return res.status(200).json(`Borrado registro de fotoF: ${id}`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Parcelas, fase prueba
exports.getParcelabyFinca = async (req, res) => {
    const tabla = `SELECT parcela, id_fincas FROM "PALMA"."P_${req.params.finca}"`;
    //console.log(req.body.finca);//ojo se tiene que enviar el formulario 
    //console.log(req.params.finca);// ese si pega
    try {
        //console.log(id);
        const Response = await database_1.pool.query(tabla);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//HilerasTerraza, esta probado 
exports.getArbolbyParcela = async (req, res) => {
    const parcela = req.params.parcela;
    const finca = req.params.finca;
    //console.log(parcela);//ojo se tiene que enviar el formulario 
    //console.log(finca);//ojo se tiene que enviar el formulario 
    const tabla = `SELECT hilera, terraza, hileraterraza FROM "PALMA"."${req.params.finca}" where parcela=$1 Group by hilera, terraza, hileraterraza Order by hilera, terraza`;
    //console.log(req.body.parcela);//ojo se tiene que enviar el formulario 
    //console.log(tabla);
    //console.log(req.params.finca);// ese si pega
    try {
        //console.log(id);
        const Response = await database_1.pool.query(tabla, [parcela]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Arboles por HileraTerraza, Todavíano 
exports.getArbolbyHileraterraza = async (req, res) => {
    const parcela = req.params.parcela;
    const finca = req.params.finca;
    const hileraterraza = req.params.hileraterraza;
    //console.log(parcela);//ojo se tiene que enviar el formulario 
    //console.log(finca);//ojo se tiene que enviar el formulario 
    const tabla = `SELECT id, arbol, hileraterraza FROM "PALMA"."${req.params.finca}" where parcela=$1 and hileraterraza=$2 Order by arbol`;
    //console.log(req.body.parcela);//ojo se tiene que enviar el formulario 
    //console.log(tabla);
    //console.log(req.params.finca);// ese si pega
    try {
        //console.log(id);
        const Response = await database_1.pool.query(tabla, [parcela, hileraterraza]);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Producción mapa, fase prueba
exports.getPProduccionbyFinca = async (req, res) => {
    //console.log('ojala');
    const tabla = `SELECT  parcela, r_totales, r_anual, r_trimestre, r_mes, r_semana, p_totales, p_erradicadas, "Fecha_plantacion", edad, kg_planta_a, "Tn_ha_a", "kg_plantaE_a", "Tn_haE_a"
		FROM "PALMA"."PP_${req.params.finca}"`;
    //console.log(req.body.finca);//ojo se tiene que enviar el formulario 
    //console.log(req.params.finca);// ese si pega
    try {
        //console.log(id);
        const Response = await database_1.pool.query(tabla);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
//Control de calidad mapa, fase prueba
exports.getCCalidadbyFinca = async (req, res) => {
    //console.log('ojala');
    const tabla = `SELECT 
						parcela,
						verde_total,
						verde_anual,
						verde_trimestre,
						verde_mes,
						podridos_total,
						podridos_anual,
						podridos_trimestre,
						podridos_mes,
						malformados_total,
						malformados_anual,
						malformados_trimestre,
						malformados_mes
		FROM "PALMA"."Cc_${req.params.finca}"`;
    //console.log(req.body.finca);//ojo se tiene que enviar el formulario 
    //console.log(req.params.finca);// ese si pega
    try {
        //console.log(id);
        const Response = await database_1.pool.query(tabla);
        return res.status(200).json(Response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Error interno bd');
    }
};
