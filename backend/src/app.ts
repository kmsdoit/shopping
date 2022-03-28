import { NextFunction, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const express = require("express");
const app = express();
const authRouter = require("../app/routes/auth-router");
const userRouter = require("../app/routes/user-router");
const cors = require('cors')();
const PORT = process.env.PORT
const swaggerSpec: any = YAML.load(path.join(__dirname + '/swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`----------------- your server listening on port : ${PORT} --------------------`);
});
