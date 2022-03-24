import { NextFunction, Request, Response } from "express";

const express = require("express");
const app = express();
const userRouter = require("../app/routes/routes");
const bodyParser = require("body-parser");
const cors = require('cors')();


const PORT = 3000;

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
