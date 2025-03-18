import express from 'express';
import { auth, crearLibro, getLibros, middlewareAutorizacion } from './controller.js';
const Router= express.Router();

//default
//libros
Router.get('/libros/',getLibros);
Router.post('/libros/',middlewareAutorizacion,crearLibro);
//Autenticacion
Router.post('/auth/',auth);

export default Router;
