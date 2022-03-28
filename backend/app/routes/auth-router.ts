import { Request, Response } from "express";

var express = require("express");
const router = express.Router();
const authApi = require("../service/auth");
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
); // session 값 저장하는 부분
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/api/users/register", authApi.registerApi); //유저 등록
router.post("/api/users/login", authApi.loginApi); // 유저 로그인
router.post("/api/AuthEmail", authApi.mailSender); // 이메일 보내기
router.get("/", (req: Request, res: Response) => {
  res.end("Hello world");
});

module.exports = router;
