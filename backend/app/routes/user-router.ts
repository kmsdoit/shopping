import { Request, Response } from "express";

var express = require("express");
const router = express.Router();
const userApi = require("../service/user");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/user/:user_id',userApi.userInfo);

module.exports = router;