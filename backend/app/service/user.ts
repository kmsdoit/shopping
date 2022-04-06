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
        const sql1 = 'select * from user where user_id = ?';
        const user_id = req.params.user_id;
        connectionPool.query(sql1,user_id,(err:any,rows:any) => {
            if(err){

                res.status(400).send('계정이 존재 하지 않습니다');
            }else{
                const sql2 = 'update user set user_password=?,user_name=?,user_email=? where user_id=?';
                const body = req.body;
                const dataArray = new Array();

                rows.map((data:any) => {
                    dataArray.push(data);
                })

                req.body.user_password = dataArray[0].user_password

                if(req.body.user_name === null){
                    req.body.user_name = dataArray[0].user_name
                }
                if(req.body.user_email === null){
                    req.body.user_email = dataArray[0].user_email;
                }

                connectionPool.query(sql2,[req.body.user_password,req.body.user_name,req.body.user_email ,user_id],(err:any) => {
                    if(err) {
                        console.log(err);
                        res.status(400).send('계정이 존재하지 않습니다');
                    }else{
                        console.log(dataArray);
                        res.status(200).send('유저정보가 변환돠었습니다');
                    }
                })
            }
        })







    }

}