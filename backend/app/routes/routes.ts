import { Request, Response } from "express";

var express = require("express");
const router = express.Router();
const userApi = require("../service/user");
const session = require("express-session");

router.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 60000,
    },
  })
);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/api/users", userApi.allUserApi);
router.post("/api/users/register", userApi.registerApi);
router.post("/api/users/login", userApi.loginApi);
router.post("/api/AuthEmail", userApi.mailSender);
router.get("/", (req: Request, res: Response) => {
  res.end("Hello world");
});

module.exports = router;
