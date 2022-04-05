import {Request, Response} from "express";

const bcrypt = require('bcrypt');
const connectionPool = require("../config/dbConnect");

module.exports = {
    userInfo : async(req:Request,res:Response) => {
        const sql = 'select * from user where user_id = ?';
        const user_id = req.params.user_id;

        await connectionPool.query(sql,user_id,(err:any,rows:Array<String>,fields:Array<String>) => {
            if(rows.length > 0){
                res.status(200).send({userinfo : rows[0]})
            }else{
                res.status(400).send('계정이 존재하지 않습니다');
            }
        })
    },

    userDelete : async(req:Request,res:Response) => {
      const sql = 'delete from user where user_id = ?';
      const user_id = req.params.user_id;

      await connectionPool.query(sql,user_id,(err:any) => {
          if(err){
              res.status(400).send('계정이 존재하지 않습니다');
          }else{
              res.status(200).send('계정이 삭제됐습니다.');
          }
      })
    },

    userUpdateApi : async(req:Request,res:Response) => {
        const sql = 'update user set user_password=?,user_name=?,user_email=? where user_id=?';
        const user_id = req.params.user_id;
        const body = req.body;
        let currentPassword = body.user_password;
         //아이디 암호화
        body.user_password = bcrypt.hashSync(currentPassword, 10);

        const param = {
            "user_id" : user_id,
            "user_password" : body.user_password,
            "user_email" : body.user_email,
            "user_name" : body.user_name
        }

        console.log(param);

        connectionPool.query(sql,param,(err:any) => {
            if(err) {
                console.log(err);
                res.status(400).send('게정이 존재하지 않습니다');
            }else{
                res.status(200).send('유저정보가 변환돠었습니다');
            }
        })
    }

}