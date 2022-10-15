"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const connexionDb_1 = __importDefault(require("./connexionDb/connexionDb"));
const routeur_models_1 = __importDefault(require("./routes/routeur.models"));
const app = (0, express_1.default)();
const port = process.env.PORT || process.env.portDev;
//Connexion a la db
connexionDb_1.default.connexionBdDev();
//
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
//
(0, routeur_models_1.default)(app);
try {
    //Chargement du certificat et key
    const key = fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "key", "key.pem"));
    const cert = fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "cert", "cert.pem"));
    //Creation du server
    const server = https_1.default.createServer({
        key: key,
        cert: cert,
    });
    //Mise en place du server
    server.on("request", app);
    server.listen(port, () => {
        console.log(`server started at 127.0.0.1:${port}`);
    });
    //
}
catch (error) {
    console.log(`Une erreur c'est produite l'or du chargement de certificat ==>:${error}`);
}
