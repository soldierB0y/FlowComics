import { libroModel, usuarioModel } from "./model.js";
import JWT from 'jsonwebtoken';
import multer from 'multer';

const secret = 'JeffWasHere';

// Configuración de multer
const storage = multer.memoryStorage(); // Puedes usar diskStorage si prefieres guardar en disco
const upload = multer({ storage,
    limits:{
        fileSize:40*1024*1024,
        fieldSize:40*1024*1024
    }
 });

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


export const crearLibro = [
    upload.single('img'), // Middleware de multer para manejar el campo 'img'
    async (req, res) => {
        try {
            const { titulo, autor, precioVenta, precioOferta, costoProduccion, categorias, ancho, alto, paginas, cantidad } = req.body;
            const img = req.file; // Archivo procesado por multer

            console.log(titulo, autor, precioVenta, precioOferta, costoProduccion, categorias, ancho, alto, paginas, cantidad, img);

            if (!titulo) {
                throw new Error("Debe proporcionar un producto");
            } else {
                // Si necesitas guardar la imagen como buffer en la base de datos
                const imgBuffer = img ? img.buffer : null;

                await libroModel.create({
                    titulo: titulo,
                    autor: autor,
                    precioVenta: precioVenta,
                    precioOferta: precioOferta,
                    costoProduccion: costoProduccion,
                    categorias: categorias,
                    ancho: ancho,
                    alto: alto,
                    paginas: paginas,
                    cantidad: cantidad,
                    fechaCreacion: Date.now(),
                    fechaModificacion: Date.now(),
                    img: imgBuffer, // Guarda la imagen como buffer
                });

                res.status(201).json({ message: 'Registrado exitosamente' });
            }
        } catch (error) {
            res.status(400).json({ Error: error.message });
            console.log(error);
        }
    }
];


export const middlewareAutorizacion = (req, res, next) => {
    console.log(Date.now());
    const tokenAValidar = req.headers['authorization'];
    console.log('TOKEN A VALIDAR',tokenAValidar)
    if (validateToken(tokenAValidar)) {
        next();
    } else {
        res.status(401).json({ message: 'token expired or invalid' });
    }
};

function createToken(user) {
    const token = JWT.sign(user, secret, { expiresIn: '30m' });
    console.log('THE TOKEN', token);
    return token;
}

function validateToken(token) {
    console.log('VERIFY TOKEN',token)
    const result = JWT.verify(token, secret, (err, user) => {
        if (err) return false;
        else return true;
    });

    return result;
}

