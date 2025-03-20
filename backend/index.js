import express from 'express';
import Router from './router.js';
import { DB } from './db.js';
import cors from 'cors';
import multer from 'multer';


const app= express();
app.use(cors());
//router
app.get('/',(req,res)=>{res.send('<h1>Documentacion</h1>')})
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/',Router);



try {

    DB.authenticate();
    console.log('base de datos verificada');
    
} catch (error) {
    console.log('Fallo en conexion: '+DB)
}


app.listen(3000);