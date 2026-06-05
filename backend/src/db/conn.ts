import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "db_amparo", // nome do banco
    "root",      // user do banco
    "root",      // senha do banco
    {
        host: "localhost",
        dialect: "mariadb",
        port: 3306
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado com sucesso.");
    } catch (err) {
        console.log("Erro ao conectar ao banco: ", err);
    }
})();

export default sequelize;
