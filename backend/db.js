import { Sequelize } from "sequelize";


export const DB= new Sequelize({
    dialect:'mysql',
    host:'localhost',
    database:'flowcomics',
    username:'root',
    password:'root'
});
