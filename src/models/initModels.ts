import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import adminModel from "./admin.model";
import coursModel from "./cours.model";
import etudiantsModel from "./etudiants.model";
import filieresModel from "./filieres.model";
import nivoEtudesModel from "./nivoEtudes.model";
import notesModel from "./notes.model";

export default class InitModels {
  //TODO
  public async onInitModels(): Promise<boolean> {
    try {
      //TODO
      const tbModelsPromise = await Promise.all([
        //ADMINS
        adminModel(this.sequelize, DataTypes),
        //ETUDIANTS
        etudiantsModel(this.sequelize, DataTypes),
        //FILIERES
        filieresModel(this.sequelize, DataTypes),
        //NIVOETUDES
        nivoEtudesModel(this.sequelize, DataTypes),
        //COURS
        coursModel(this.sequelize, DataTypes),
        //NOTES
        notesModel(this.sequelize, DataTypes),
      ]);

      if (tbModelsPromise) {
        this.relationsModels();
        return true;
      }
    } catch (error) {}
  }

  //TODO
  private relationsModels() {
    //MODELS
    const etudiantModel = this.sequelize.models.Etudiant;
    const filiereModel = this.sequelize.models.Filiere;
    const nivoEtudeModel = this.sequelize.models.NivoEtude;
    const noteModel = this.sequelize.models.Note;
    const courModel = this.sequelize.models.Cour;

    //TODO ETUDIANT RELATION
    //RELATION ETUDIANT AND FILIERE
    filiereModel.hasMany(etudiantModel, {
      foreignKey: {
        allowNull: false,
      },
    });
    etudiantModel.belongsTo(filiereModel);
    //RELATION ETUDIANT AND NIVO_ETUDE
    nivoEtudeModel.hasMany(etudiantModel, {
      foreignKey: {
        allowNull: false,
      },
    });
    etudiantModel.belongsTo(nivoEtudeModel);
    //RELATION ETUDIANT AND NOTE
    etudiantModel.hasMany(noteModel, {
      foreignKey: {
        allowNull: false,
      },
    });
    noteModel.belongsTo(etudiantModel);

    //TODO COUR RELATION
    //RELATION COUR AND FILIERE
    courModel.belongsToMany(filiereModel, { through: "Cours_Filiere" });
    filiereModel.belongsToMany(courModel, { through: "Cours_Filiere" });
    //RELATION COUR AND NIVO_ETUDE
    courModel.belongsToMany(nivoEtudeModel, { through: "Cours_NivoEtude" });
    nivoEtudeModel.belongsToMany(courModel, { through: "Cours_NivoEtude" });

    //TODO NOTE RELATION
    //RELATION NOTE AND FILIERE
    filiereModel.hasMany(noteModel, {
      foreignKey: {
        allowNull: false,
      },
    });
    noteModel.belongsTo(filiereModel);
    //RELATION NOTE AND COUR
    courModel.hasMany(noteModel, {
      foreignKey: {
        allowNull: false,
      },
    });
    noteModel.belongsTo(courModel);
  }
  constructor(private sequelize: Sequelize) {}
}
