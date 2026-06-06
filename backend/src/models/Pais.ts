import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";

interface IPais {
    id_pais: number;
    nome_pais: string;
    sigla_pais: string;
}

type PaisCreation = Optional<IPais, "id_pais">;

class Pais extends Model<IPais, PaisCreation> implements IPais {
    public id_pais!: number;
    public nome_pais!: string;
    public sigla_pais!: string;
}

Pais.init(
    {
        id_pais: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_pais: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        sigla_pais: {
            type: DataTypes.CHAR(3),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "pais",
        timestamps: false
    }
);

export default Pais;
