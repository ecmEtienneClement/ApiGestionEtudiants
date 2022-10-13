//

import adminsRoutes from "./adminsRoutes/admins.routes";
import coursRoutes from "./coursRoutes/cours.routes";

const routeurModels = (app) => {
  app.get("/", (re, res) => {
    res.json({ data: "response" });
  });

  app.use("/admins", adminsRoutes);
  app.use("/cours", coursRoutes);
};

export default routeurModels;
