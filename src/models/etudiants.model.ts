import { Sequelize } from "sequelize";

//TODO
export default async (sequelize: Sequelize, dataTypes: any) => {
  return sequelize.define(
    "Etudiant",
    {
      //TODO
      _id: {
        type: dataTypes.UUID,
        primaryKey: true,
        defaultValue: dataTypes.UUIDV4,
      },
      //TODO
      nom: {
        type: dataTypes.STRING,
        validate: {
          notEmpty: { msg: "Le nom de l'étudiant ne peut étre vide." },
          notNull: { msg: "Le nom de l'étudiant est requise." },
          len: [2, 10],
        },
        allowNull: false,
      },
      //TODO
      prenom: {
        type: dataTypes.STRING,
        validate: {
          notEmpty: { msg: "Le prénom de l'étudiant ne peut étre vide." },
          notNull: { msg: "Le prénom de l'étudiant est requise." },
          len: [2, 25],
        },
        allowNull: false,
      },
      //TODO
      ine: {
        type: dataTypes.STRING,
        validate: {
          notEmpty: { msg: "L'ine de l'étudiant ne peut étre vide." },
          notNull: { msg: "L'ine de l'étudiant est requise." },
          len: [10, 10],
          validateIne(value: string) {
            if (!value.startsWith("N")) {
              throw new Error("Format INE invalide.");
            }
          },
        },
        unique: true,
        allowNull: false,
      },
      //TODO
      numeroTelephone: {
        type: dataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Le numéro de téléphone de l'étudiant ne peut étre vide.",
          },
          notNull: { msg: "Le numéro de téléphone de l'étudiant est requise." },
          len: [9, 9],
        },
        allowNull: false,
      },
      //TODO
      address: {
        type: dataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "L'address de l'étudiant ne peut étre vide.",
          },
          notNull: { msg: "L'address de l'étudiant est requise." },
          len: [2, 30],
        },
        allowNull: false,
      },
      //TODO
      email: {
        type: dataTypes.STRING,
        validate: {
          notNull: { msg: "L'email de l'étudiant est requise." },
          len: [10, 50],
          validateMail(value: string) {
            if (!value.startsWith(this.prenom + "." + this.nom)) {
              throw new Error("Format email invalide.");
            }
            if (!value.endsWith("@uvs.edu.sn")) {
              throw new Error("Format email invalide: ... @uvs.edu.sn");
            }
          },
        },
        allowNull: false,
      },
      //TODO
      mdp: {
        type: dataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Le mot de passe de l'étudiant ne peut étre vide.",
          },
          notNull: { msg: "Le mot de passe de l'étudiant est requise." },
          len: [6, 20],
        },
        allowNull: false,
      },
      //TODO
      role: {
        type: dataTypes.STRING,
        defaultValue: "etudiant",
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
