import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import Logadouro from "./Logadouro";

interface IUsuario {
    id_usuario: number;
    id_logadouro: number;
    nome_usuario: string;
    email_usuario: string;
    senha_usuario: string;
    telefone_usuario: string;
    data_nascimento: string;
    genero_usuario: string;
}

type UsuarioCreation = Optional<IUsuario, "id_usuario">;

class Usuario extends Model<IUsuario, UsuarioCreation> implements IUsuario {
    public id_usuario!: number;
    public id_logadouro!: number;
    public nome_usuario!: string;
    public email_usuario!: string;
    public senha_usuario!: string;
    public telefone_usuario!: string;
    public data_nascimento!: string;
    public genero_usuario!: string;
}

Usuario.init(
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_logadouro: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome_usuario: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email_usuario: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        senha_usuario: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        telefone_usuario: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        genero_usuario: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "usuario",
        timestamps: false
    }
);

Usuario.belongsTo(Logadouro, { foreignKey: "id_logadouro" });

export default Usuario;
