import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import Mensagem from "./Mensagem";

interface IAlerta {
    id_alerta: number;
    id_mensagem: number;
    id_usuario: number;
    data_hora: Date;
    status: string;
    observacao: string;
}

type AlertaCreation = Optional<IAlerta, "id_alerta">;

class Alerta extends Model<IAlerta, AlertaCreation> implements IAlerta {
    public id_alerta!: number;
    public id_mensagem!: number;
    public id_usuario!: number;
    public data_hora!: Date;
    public status!: string;
    public observacao!: string;
}

Alerta.init(
    {
        id_alerta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_mensagem: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data_hora: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        observacao: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "alerta",
        timestamps: false
    }
);

Alerta.belongsTo(Mensagem, { foreignKey: "id_mensagem" });

export default Alerta;
