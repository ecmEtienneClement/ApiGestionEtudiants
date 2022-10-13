import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import InitModels from "../models/initModels";
dotenv.config();
//TODO
export default class ConnexionBd {
  private static sequelizeDb: Sequelize;
  //TODO
  public static connexionBdDev = async () => {
    const sequelizeDb = new Sequelize(
      process.env.bdName,
      process.env.user,
      process.env.pwd,
      {
        host: process.env.host,
        dialect: "mysql",
      }
    );
    try {
      await sequelizeDb.authenticate();
      console.log("[mode Dev] Connexion à la base de donnée reussit");

      const initModels = new InitModels(sequelizeDb);
      const promiseInitModels = await initModels.onInitModels();

      if (promiseInitModels) {
        return sequelizeDb
          .sync({ force: true })
          .then((dat) => {
            console.log("Bd success ...");
            return (this.sequelizeDb = dat);
          })
          .catch((error) => {
            console.log("not tb" + error);
            return false;
          });
      } else {
        return false;
      }
    } catch (error) {
      console.log("error ==>" + error);
      return false;
    }
  };
  //TODO
  public static getSequelizeDb(): Sequelize {
    return this.sequelizeDb;
  }
}
