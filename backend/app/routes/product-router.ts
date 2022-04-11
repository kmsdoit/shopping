import { Request, Response } from "express";

var express = require("express");
const router = express.Router();
const productApi = require("../service/product");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/product/:product_no',productApi.productInfo);
router.post('/product/update/:product_no',productApi.userUpdateApi);
router.delete('/product/delete/:product_no',productApi.productDelete);

module.exports = router;

