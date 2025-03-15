import { DataTypes } from "sequelize"
import { DB } from "./db.js"


export const libroModel= DB.define('libro',{
    IDLibro:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    autor:{
        type: DataTypes.STRING,
        allowNull:false,

    },
    IDLibro:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    precioVenta:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    precioOferta:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    costoProduccion:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    categorias:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    ancho:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    alto:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    paginas:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    img:{
        type:DataTypes.BLOB,
        allowNull:true
    },
    fechaCreacion:{
        type: DataTypes.DATE,
        allowNull:false
    },
    fechaModificacion:{
        type: DataTypes.DATE,
        allowNull:false
    }
},{
    timestamps:false,
    tableName:'libro'
})

export const usuarioModel= DB.define('usuarios',{
    IDUsuario:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    usuario:{
        type:DataTypes.STRING,
        allowNull:false
    },
    clave:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    correo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rol:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{tableName:'usuarios',timestamps:false})