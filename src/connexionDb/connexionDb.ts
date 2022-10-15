import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import InitModels from "../models/initModels";
dotenv.config();
//TODO
export default class ConnexionBd {
  private static sequelizeDb: Sequelize;
  //TODO
  public static connexionBdDev = async () => {
    const sequelizeDbConnexion = new Sequelize(
      process.env.bdName,
      process.env.user,
      process.env.pwd,
      {
        host: process.env.host,
        dialect: "mysql",
      }
    );
    try {
      await sequelizeDbConnexion.authenticate();
      console.log("[mode Dev] Connexion à la base de donnée reussit");
      const initModels = new InitModels(sequelizeDbConnexion);
      const promiseInitModels = await initModels.onInitModels();

      if (promiseInitModels) {
        try {
          const data = await sequelizeDbConnexion.sync({ force: false });
          this.sequelizeDb = data;
          if (data) {
            this.iniDefaultAdmin();
          }
          return this.sequelizeDb;
        } catch (error) {
          console.log(
            "Une erreut c'est produite avec la synchronisation de la base de donnée." +
              error
          );
          return false;
        }
      } else {
        throw new Error(
          "Une erreut c'est produite avec l'initialisation des models"
        );
      }
    } catch (error) {
      console.log("error ==>" + error);
      return false;
    }
  };

  //TODO
  private static async iniDefaultAdmin(): Promise<void> {
    //MISE EN PLACE DE L'ADMINISTRATEUR PAR DEFAUT
    const modelDefaultAdmin = this.getSequelizeDb().models.Admin;
    const dataDefautlAdmin = await modelDefaultAdmin.findOne({
      where: { nom: "ADMIN", prenom: "FIRST" },
    });
    if (!dataDefautlAdmin) {
      const pwdHash: string = await bcrypt.hash("Firstadmin01", 10);
      const newDataDefautlAdmin = await modelDefaultAdmin.create({
        nom: "ADMIN",
        prenom: "FIRST",
        numeroTelephone: "000000000",
        address: "API",
        email: "$FIRST.ADMIN@uvs.edu.sn",
        mdp: pwdHash,
      });
      if (!newDataDefautlAdmin) {
        throw new Error("Une erreut c'est produite avec le default ADMIN");
      }
    }
  }
  //TODO
  public static getSequelizeDb(): Sequelize {
    return this.sequelizeDb;
  }
}
