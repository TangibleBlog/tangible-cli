// eslint-disable-next-line import/no-extraneous-dependencies
import {Sequelize} from "sequelize";

const sequelizeConnect = new Sequelize({
    host: "localhost",
    dialect: "sqlite",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: "./documents/history.db"
});

export default sequelizeConnect;
