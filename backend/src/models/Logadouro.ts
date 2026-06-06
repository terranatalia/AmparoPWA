import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import Cidade from "./Cidade";

interface ILogadouro {
    id_logadouro: number;
    id_cidade: number;
    cep: string;
    logradouro: string;
    complemento: string;
    numero: string;
    bairro: string;
    localidade: string;
}

type LogadouroCreation = Optional<ILogadouro, "id_logadouro">;

class Logadouro extends Model<ILogadouro, LogadouroCreation> implements ILogadouro {
    public id_logadouro!: number;
    public id_cidade!: number;
    public cep!: string;
    public logradouro!: string;
    public complemento!: string;
    public numero!: string;
    public bairro!: string;
    public localidade!: string;
}

Logadouro.init(
    {
        id_logadouro: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_cidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cep: {
            type: DataTypes.CHAR(8),
            allowNull: false
        },
        logradouro: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        complemento: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        numero: {
            type: DataTypes.CHAR(5),
            allowNull: false
        },
        bairro: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        localidade: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "logadouro",
        timestamps: false
    }
);

Logadouro.belongsTo(Cidade, { foreignKey: "id_cidade" });

export default Logadouro;
