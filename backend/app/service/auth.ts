import { Request, Response } from "express";

const connectionPool = require("../config/dbConnect");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const table = "user";

const generateRandom = function (min:any, max:any) {
  const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  return ranNum;
}

module.exports = {

  allUserApi: async (res: Response) => {
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

    let currentPassword = body.user_password;
    const encryptedPW = bcrypt.hashSync(currentPassword, 10) //아이디 암호화


    const param = {
      user_id : body.user_id,
      user_password:encryptedPW,
      user_name:body.user_name,
      user_email:body.user_email
    }

    connectionPool.query(sql, param, (err: any, rows: any, fields: any) => {
      if (err) {
        
        res.status(400).send({ msg: "error", content: err });
      } else {
        res.status(200).send({ msg: "success" , param:param});
      }
    });
  },

  //login API
  loginApi: async (req: Request, res: Response) => {
      const sql = `select * from ${table} where user_id = ?`;
      const body = req.body;
      const jwtTokenKey = process.env.ACCESS_TOKEN_SECRET;
      const param = [body.user_id,body.user_password]

      connectionPool.query(sql, [param[0]], (err: any, rows: any, fields: any) => {
        if (err) {
          res.status(404).send({ msg: "error", content: err });
        } else {

          if(rows.length > 0){
            bcrypt.compare(param[1],rows[0].user_password,(error:any,result:Boolean) => {
              if(result) {
                const token = jwt.sign({
                  user_id: body.user_id
                  },jwtTokenKey, {
                    expiresIn: '1h'
                  });
                  res.cookie('token',token);
                  res.status(200).json({
                        result: 'ok',
                        token
                  });
              }else{
                res.status(400).send("비밀번호가 틀렸습니다");
              }
            });

          }
          else {
            res.status(400).send("위 사용자는 계정이 존재하지 않습니다");
          }

        }
    })
  },

   //이메일 보내는 API 
   mailSender : async (req:Request,res:Response) => {
    const email = req.body.user_email;
    const number = generateRandom(111111,999999); // 난수 발생

    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  
    // send mail with defined transport object
    const info =  await transporter.sendMail({
      from: `"IDB side-project Team" <${process.env.NODEMAILER_USER}>`,
      to: `${email}`,
      subject: 'Shopping Auth Number',
      text: `${number}`,
      html: `<b>${number}</b>`,
    });

    await transporter.sendMail(info, function (error:any, info:any) {
        res.cookie("number",number);
        if (error) {
            console.log(error);
            res.status(400).send({msg:'fail', content:'이메일 정보를 다시 확인 해주세요'})
        }
        console.log("Finish sending email : " + info);
        res.status(200).send({msg : "success"});
        transporter.close()
    });
  }
}
