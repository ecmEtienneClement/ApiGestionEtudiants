import { Sequelize } from "sequelize";

//TODO
export default async (sequelize: Sequelize, dataTypes: any) => {
  return sequelize.define("Admin", {
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
        notEmpty: { msg: "Le nom de l'adminitrateur ne peut étre vide." },
        notNull: { msg: "Le nom de l'adminitrateur est requise." },
        len: {
          args: [2, 15],
          msg: "Le nom de l'adminitrateur doit être comprise entre 2 à 15 lettres.",
        },
      },
      allowNull: false,
    },
    //TODO
    prenom: {
      type: dataTypes.STRING,
      validate: {
        notEmpty: { msg: "Le prénom de l'adminitrateur ne peut étre vide." },
        notNull: { msg: "Le prénom de l'adminitrateur est requise." },
        len: {
          args: [2, 25],
          msg: "Le prénom de l'adminitrateur doit être comprise entre 2 à 25 lettres.",
        },
      },

      allowNull: false,
    },
    //TODO
    numeroTelephone: {
      type: dataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Le numéro de téléphone de l'adminitrateur ne peut étre vide.",
        },
        notNull: {
          msg: "Le numéro de téléphone de l'adminitrateur est requise.",
        },
        len: {
          args: [9, 9],
          msg: "Le numéro de téléphone de l'adminitrateur est invalide.",
        },
      },
      unique: {
        name: "numeroTelephone",
        msg: "Désoler ce numéro de téléphone existe déja.",
      },

      allowNull: false,
    },
    //TODO
    address: {
      type: dataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "L'address de l'adminitrateur ne peut étre vide.",
        },
        notNull: { msg: "L'address de l'adminitrateur est requise." },
        len: {
          args: [2, 25],
          msg: "L'address de l'adminitrateur doit être comprise entre 2 à 25 caractères.",
        },
      },
      allowNull: false,
    },
    //TODO
    email: {
      type: dataTypes.STRING,
      validate: {
        notNull: { msg: "L'email de l'adminitrateur est requise." },
        len: [10, 50],
        validateMail(value: string) {
          let prenom: string = this.prenom.trim();
          while (prenom.includes(" ")) {
            const prenomReplace = prenom.replace(" ", "");
            prenom = prenomReplace;
          }
          if (!value.startsWith("$" + prenom + "." + this.nom)) {
            throw new Error("Format email invalide : $...");
          }
          if (!value.endsWith("@uvs.edu.sn")) {
            throw new Error("Format email invalide: ... @uvs.edu.sn");
          }
        },
      },
      unique: { name: "email", msg: "Désoler cet email existe déja." },
      allowNull: false,
    },
    //TODO
    mdp: {
      type: dataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Le mot de passe de l'adminitrateur ne peut étre vide.",
        },
        notNull: { msg: "Le mot de passe de l'adminitrateur est requise." },
        len: {
          args: [6, 250],
          msg: "Le mot de passe de l'adminitrateur doit être comprise entre 6 à 250 caractères.",
        },
      },
      allowNull: false,
    },
    //TODO
    role: {
      type: dataTypes.STRING,
      defaultValue: "admin",
    },
  });
};
