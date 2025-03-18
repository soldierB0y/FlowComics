import { libroModel, usuarioModel } from "./model.js";
import JWT from 'jsonwebtoken';

const secret = 'JeffWasHere';

export const auth = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (username && username !== '') {
        usuarioModel.findOne({ where: { usuario: username } })
            .then(x => {
                console.log(x);
                if (x && x.clave === password) {
                    const newToken = createToken({ username });
                    const userData= {username:x.usuario,nombre:x.nombre,correo:x.correo,rol:x.rol,IDUsuario:x.IDUsuario}
                    res.status(200).json({ result: 'Autorizacion Validada', token: newToken,userData});
                } else {
                    res.status(401).json({ result: 'Credenciales Incorrectas' });
                }
            })
            .catch(err => {
                console.log('error', err);
                res.status(401).json(err);
            });
    } else {
        res.status(401).send({ error: 'Credenciales Incorrectas' });
    }
};

export const getLibros = async (req, res) => {
    try {
        const value = await libroModel.findAll();
        res.status(200).json(value);
        console.log(value);
    } catch (error) {
        res.status(400).json({ Error: 'No se ha podido realizar la solicitud' });
        console.log(error);
    }
};


export const crearLibro= async (req,res)=>{
    try {
        const {titulo,autor,precioVenta,precioOferta,costoProduccion,categorias,ancho,alto,paginas,cantidad,img}= req.body;
        if(!titulo)
            throw new Error("Debe proporcionar un producto");
        else
        {
            libroModel.create({
                titulo: titulo,
                autor: autor,
                precioVenta:precioVenta,
                precioOferta:precioOferta,
                costoProduccion:costoProduccion,
                categorias:categorias,
                ancho:ancho,
                alto:alto,
                paginas:paginas,
                cantidad:cantidad,
                fechaCreacion:Date.now(),
                fechaModificacion:Date.now(),
                img:img
            });

            res.status(201).json({message:'Registrado exitosamente'});
        }


    } catch (error) {
        res.status(400).json({ Error:error.message});
        console.log(error);
    }
}



export const middlewareAutorizacion = (req, res, next) => {
    console.log(Date.now());
    const tokenAValidar = req.headers['authorization'];
    if (validateToken(tokenAValidar)) {
        next();
    } else {
        res.status(498).json({ message: 'token expired or invalid' });
    }
};

function createToken(user) {
    const token = JWT.sign(user, secret, { expiresIn: '30m' });
    console.log('THE TOKEN', token);
    return token;
}

function validateToken(token) {
    const result = JWT.verify(token, secret, (err, user) => {
        if (err) return false;
        else return true;
    });

    return result;
}

