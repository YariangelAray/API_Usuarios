import express from "express";
import bodyParser from "body-parser";
import ciudadRoutes from "./Routes/ciudadRoutes.js";
import generoRoutes from "./Routes/generoRoutes.js";
import lenguajeRoutes from "./Routes/lenguajeRoutes.js";
import usuarioRoutes from "./Routes/usuarioRoutes.js";
// import lenguaje_usuarioRoutes from "./Routes/lenguaje_usuarioRoutes.js";

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({"extended":true}))

app.use("/ciudades", ciudadRoutes );

app.use("/generos", generoRoutes );

app.use("/lenguajes", lenguajeRoutes );

app.use("/usuarios", usuarioRoutes );

// app.use("/lenguaje_usuario", lenguaje_usuarioRoutes );

app.listen(3000, () => {
  console.log("Server is running...");  
});