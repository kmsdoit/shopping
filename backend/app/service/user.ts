import { Request, Response } from "express";
import { join } from "path";
import { hasUncaughtExceptionCaptureCallback } from "process";

const connectionPool = require("../config/dbConnect");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('wolfootjaIsSpecial','specialSalt', 32); 
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);
const deciper = crypto.createDecipheriv(algorithm, key, iv);

require('dotenv').config();
const table = "user";

module.exports = {
  allUserApi: async (req:Request,res: Response) => {
    const sql = `select * from ${table}`;
    connectionPool.query(sql, (err: any, rows: any, fields: any) => {
      if (err) {
        res.status(400).send({ msg: "error", content: err });
      } else {
        res.status(200).send({ msg: "success", user: rows });
      }
    });
  },

  registerApi: async (req: Request, res: Response) => {
    const sql = `insert into ${table} set ?`;
    const body = req.body;

    let inputPassword = body.user_password;
    cipher.update(inputPassword,'utf8','base64');
    let result = cipher.final('base6');

    const param = {
      user_id : body.user_id,
      user_password:result,
      user_name:body.user_name,
      user_email:body.user_email
    }

    connectionPool.query(sql, param, (err: any, rows: any, fields: any) => {
      if (err) {
        res.status(400).send({ msg: "error", content: err });
      } else {
        res.cookie('password',param);
        res.status(200).send({ msg: "success" , param :param});
      }
    });
  },

  loginApi: async (req: Request, res: Response) => {
      const sql = `select * from ${table} where user_id = ? and user_password = ?`;
      const param = req.body.param;
      const jwtTokenKey = process.env.ACCESS_TOKEN_SECRET;
      

      connectionPool.query(sql, param, (err: any, rows: any, fields: any) => {
        if (err) {
          res.status(404).send({ msg: "error", content: err });
        } else {
          rows.map((loginData:any) => {
            if (param[0] === loginData.user_id && param[1] === loginData.user_password) {
              const token = jwt.sign({user_id:loginData.user_id},jwtTokenKey,{
                expiresIn : '1h'
              });

              res.cookie('token',token);
              res.status(200).json({
                result: 'ok',
                token
              });
            } else {
              res.status(400).json({ error: 'invalid user' });
            } 
        });
      }
    })
  },
}
