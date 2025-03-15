import express from 'express';
import { auth, getLibros, middlewareAutorizacion } from './controller.js';
const Router= express.Router();

//default
//libros
Router.get('/libros/',middlewareAutorizacion,getLibros);
//Autenticacion
Router.post('/auth/',auth);

export default Router;
