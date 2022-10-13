import express from "express";
import bodyParser from "body-parser";
import https from "https";
import cors from "cors";
import fs from "fs";
import path from "path";
import connexionBd from "./connexionDb/connexionDb";
import routeurModels from "./routes/routeur.models";

const app = express();
const port = process.env.PORT || process.env.portDev;

//Connexion a la db
connexionBd.connexionBdDev();
//
app.use(cors());
app.use(bodyParser.json());
//
routeurModels(app);

try {
  //Chargement du certificat et key
  const key = fs.readFileSync(path.join(__dirname, "ssl", "key", "key.pem"));
  const cert = fs.readFileSync(path.join(__dirname, "ssl", "cert", "cert.pem"));
  //Creation du server
  const server = https.createServer({
    key: key,
    cert: cert,
  });
  //Mise en place du server
  server.on("request", app);
  server.listen(port, () => {
    console.log(`server started at 127.0.0.1:${port}`);
  });
  //
} catch (error) {
  console.log(
    `Une erreur c'est produite l'or du chargement de certificat ==>:${error}`
  );
}
