import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import indexRoutes from './routes/index';


const app = express ();



//setting
app.set('port', process.env.PORT || 3000);


//middleware

app.use(morgan('dev')); // para ver lineas por consola
app.use(express.json());//convierte los datos a un archivo json
app.use(cors());//ojo esto me estaba dando un error del tipo OPTIONS ojo 
app.use(express.urlencoded({extended: false})); // permite  convertie datos de un formulario a json

//routes

app.use('/api', indexRoutes);

// este folder para esta aplicación será almecenado para archivos públics

app.use('/uploads', express.static(path.resolve('uploads')));


export default app;


