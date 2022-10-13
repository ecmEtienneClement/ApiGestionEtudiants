import { Sequelize } from "sequelize";

//TODO
export default async (sequelize: Sequelize, dataTypes: any) => {
  return sequelize.define(
    "Note",
    {
      //TODO
      _id: {
        type: dataTypes.UUID,
        primaryKey: true,
        defaultValue: dataTypes.UUIDV4,
      },
      //TODO
      note: {
        type: dataTypes.UUID,
        allowNull: false,
        validate: {
          isNull: { msg: "La note de l'étudiant est requise." },
          min: { args: [0], msg: "La note minimale est zero." },
          max: { args: [20], msg: "La note maximale est 20." },
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
