"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoutesErrorHelper {
    //TODO
    static routesErrors(error, res) {
        if (error.name === "SequelizeValidationError" ||
            error.name === "SequelizeUniqueConstraintError") {
            const messageErrors = error.message.split("\n");
            return res.status(400).json({ messageErrors, error });
        }
        else if (error.name === "SequelizeDatabaseError") {
            return res.status(400).json({
                error,
                message: "Une erreur c'est produite veillez vérifier les données saisis.",
            });
        }
        else {
            return res.status(500).json({
                error,
                message: "Une erreur c'est produite veillez réessayer dans quelques instant ...",
            });
        }
    }
    //TODO
    /**
     * name
     */
    static pwdIsValid(pwd, res) {
        const regIncludeLettreMini = new RegExp("[a-z]+", "g");
        const regIncludeLettreMaju = new RegExp("[A-Z]+", "g");
        const regIncludeChiffre = new RegExp("[0-9]+", "g");
        const message = "Votre mot de passe doit avoir au moins";
        //Verification
        if (!regIncludeLettreMini.test(pwd)) {
            res.json({ message: message + " une lettre minuscule" });
            return false;
        }
        if (!regIncludeLettreMaju.test(pwd)) {
            res.json({ message: message + " une lettre majuscule" });
            return false;
        }
        if (!regIncludeChiffre.test(pwd)) {
            res.json({ message: message + " un chiffre" });
            return false;
        }
        return true;
    }
}
exports.default = RoutesErrorHelper;
