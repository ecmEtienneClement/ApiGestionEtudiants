"use strict";
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admins_routes_1 = __importDefault(require("./adminsRoutes/admins.routes"));
const etudiants_routes_1 = __importDefault(require("./etudiantsRoutes/etudiants.routes"));
const cours_routes_1 = __importDefault(require("./coursRoutes/cours.routes"));
const filieres_routes_1 = __importDefault(require("./filieresRoutes/filieres.routes"));
const nivoEtudes_routes_1 = __importDefault(require("./nivoEtudesRoutes/nivoEtudes.routes"));
const notes_routes_1 = __importDefault(require("./notesRoutes/notes.routes"));
const sign_routes_1 = __importDefault(require("./signRoutes/sign.routes"));
const auth_autho_1 = __importDefault(require("../authorizations/auth.autho"));
const admins_autho_1 = __importDefault(require("../authorizations/admins.autho"));
const routeurModels = (app) => {
    app.get("/", (re, res) => {
        res.json({ data: "BIENVENUE DANS API GESTION ETUDIANTS" });
    });
    app.use("/sign", sign_routes_1.default);
    app.use("/admins", auth_autho_1.default, admins_autho_1.default, admins_routes_1.default);
    app.use("/etudiants", auth_autho_1.default, etudiants_routes_1.default);
    app.use("/filieres", auth_autho_1.default, filieres_routes_1.default);
    app.use("/niveau_etudes", auth_autho_1.default, nivoEtudes_routes_1.default);
    app.use("/cours", auth_autho_1.default, cours_routes_1.default);
    app.use("/notes", auth_autho_1.default, notes_routes_1.default);
    //
    app.use("/**", (re, res) => {
        res.status(404).json({ messageNotFound: "ressouce notFound !" });
    });
};
exports.default = routeurModels;
