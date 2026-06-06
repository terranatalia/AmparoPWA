import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import Estado from "./Estado";

interface ICidade {
    id_cidade: number;
    id_estado: number;
    nome_cidade: string;
}

type CidadeCreation = Optional<ICidade, "id_cidade">;

class Cidade extends Model<ICidade, CidadeCreation> implements ICidade {
    public id_cidade!: number;
    public id_estado!: number;
    public nome_cidade!: string;
}

Cidade.init(
    {
        id_cidade: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_estado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome_cidade: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "cidade",
        timestamps: false
    }
);

Cidade.belongsTo(Estado, { foreignKey: "id_estado" });

export default Cidade;
