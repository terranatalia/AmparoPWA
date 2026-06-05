import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import Usuario from "./Usuario";
import UsuarioTipo from "./UsuarioTipo";

interface IContatoEmergencia {
    id_contato_emergencia: number;
    id_usuario: number;
    id_usuario_tipo: number;
    nome_contato: string;
    telefone_contato: string;
}

type ContatoEmergenciaCreation = Optional<IContatoEmergencia, "id_contato_emergencia">;

class ContatoEmergencia extends Model<IContatoEmergencia, ContatoEmergenciaCreation> implements IContatoEmergencia {
    public id_contato_emergencia!: number;
    public id_usuario!: number;
    public id_usuario_tipo!: number;
    public nome_contato!: string;
    public telefone_contato!: string;
}

ContatoEmergencia.init(
    {
        id_contato_emergencia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_usuario_tipo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome_contato: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        telefone_contato: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "contato_emergencia",
        timestamps: false
    }
);

ContatoEmergencia.belongsTo(Usuario, { foreignKey: "id_usuario" });
ContatoEmergencia.belongsTo(UsuarioTipo, { foreignKey: "id_usuario_tipo" });

export default ContatoEmergencia;
