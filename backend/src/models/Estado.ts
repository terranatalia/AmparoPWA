import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import Pais from "./Pais";

interface IEstado {
    id_estado: number;
    id_pais: number;
    nome_estado: string;
    sigla_estado: string;
}

type EstadoCreation = Optional<IEstado, "id_estado">;

class Estado extends Model<IEstado, EstadoCreation> implements IEstado {
    public id_estado!: number;
    public id_pais!: number;
    public nome_estado!: string;
    public sigla_estado!: string;
}

Estado.init(
    {
        id_estado: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_pais: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome_estado: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        sigla_estado: {
            type: DataTypes.CHAR(3),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "estado",
        timestamps: false
    }
);

Estado.belongsTo(Pais, { foreignKey: "id_pais" });

export default Estado;
