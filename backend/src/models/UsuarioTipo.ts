import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import Usuario from "./Usuario";

interface IUsuarioTipo {
    id_usuario_tipo: number;
    id_usuario: number;
    nome_usuario_tipo: string;
}

type UsuarioTipoCreation = Optional<IUsuarioTipo, "id_usuario_tipo">;

class UsuarioTipo extends Model<IUsuarioTipo, UsuarioTipoCreation> implements IUsuarioTipo {
    public id_usuario_tipo!: number;
    public id_usuario!: number;
    public nome_usuario_tipo!: string;
}

UsuarioTipo.init(
    {
        id_usuario_tipo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome_usuario_tipo: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "usuario_tipo",
        timestamps: false
    }
);

UsuarioTipo.belongsTo(Usuario, { foreignKey: "id_usuario" });

export default UsuarioTipo;
