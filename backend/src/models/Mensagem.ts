import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/conn";
import ContatoEmergencia from "./ContatoEmergencia";

interface IMensagem {
    id_mensagem: number;
    id_contato_emergencia: number;
    texto: string;
}

type MensagemCreation = Optional<IMensagem, "id_mensagem">;

class Mensagem extends Model<IMensagem, MensagemCreation> implements IMensagem {
    public id_mensagem!: number;
    public id_contato_emergencia!: number;
    public texto!: string;
}

Mensagem.init(
    {
        id_mensagem: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_contato_emergencia: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        texto: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "mensagem",
        timestamps: false
    }
);

Mensagem.belongsTo(ContatoEmergencia, { foreignKey: "id_contato_emergencia" });

export default Mensagem;
