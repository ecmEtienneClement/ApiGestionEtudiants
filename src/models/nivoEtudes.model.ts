//TODO
export default async (sequelize: any, dataTypes: any) => {
  return sequelize.define(
    "NivoEtude",
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
          notEmpty: { msg: "Le niveau d'étude ne peut étre vide." },
          notNull: { msg: "Le niveau d'étude est requise." },
          len: [2, 30],
        },
        unique: {
          name: "nom",
          msg: "Désoler cet niveau d'étude existe déja.",
        },
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
