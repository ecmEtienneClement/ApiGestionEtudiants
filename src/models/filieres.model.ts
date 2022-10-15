//TODO
export default async (sequelize: any, dataTypes: any) => {
  return sequelize.define(
    "Filiere",
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
          notEmpty: { msg: "Le nom de la filière ne peut étre vide." },
          notNull: { msg: "Le nom de la filière est requise." },
          len: [2, 30],
        },
        unique: {
          name: "nom",
          msg: "Désoler cette filière existe déja.",
        },
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
