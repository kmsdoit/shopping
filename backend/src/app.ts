import { NextFunction, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
const express = require("express");
const app = express();
const userRouter = require("../app/routes/routes");
const cors = require('cors')();
const PORT = 3000;

const swaggerSpec: any = YAML.load(path.join(__dirname + '/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(cors);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRouter);






app.get("/welcome", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`----------------- your server listening on port : ${PORT}`);
});
