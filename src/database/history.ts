import sequelizeConnect from "@/database/connect";
// eslint-disable-next-line import/no-extraneous-dependencies
import {DataTypes} from "sequelize";

const History = sequelizeConnect.define("histories", {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    meta_data: DataTypes.STRING,
    content: DataTypes.STRING,
    create_time: DataTypes.INTEGER
}, {timestamps: false});
export default History;
