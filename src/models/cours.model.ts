import { Sequelize } from "sequelize";

//TODO
export default async (sequelize: Sequelize, dataTypes: any) => {
  return sequelize.define(
    "Cour",
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
          notEmpty: { msg: "Le nom du cour ne peut étre vide." },
          notNull: { msg: "Le nom du cour  est requise." },
          len: {
            args: [2, 50],
            msg: "Le nom du cour doit être comprise entre 2 à 50 lettres.",
          },
        },
        unique: {
          name: "nom",
          msg: "Désoler ce cour existe déja.",
        },

        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
