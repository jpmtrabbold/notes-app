import express, { Application } from "express";
import morgan from "morgan";

import 'source-map-support/register'

import ServerlessHttp from "serverless-http";
import { RegisterRoutes } from "./routes/routes";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(express.json({ strict: false }));

// TODO: swagger interface
//import swaggerUi from "swagger-ui-express";
// app.use(
//     "/swagger",
//     swaggerUi.serve,
//     swaggerUi.setup(undefined, {
//         swaggerOptions: {
//             url: "/swagger.json",
//         },
//     })
// );

//app.use(Router);
RegisterRoutes(app);

export const handler = ServerlessHttp(app);