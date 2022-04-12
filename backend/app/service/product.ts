import {Request, Response} from "express";

const bcrypt = require('bcrypt');
const connectionPool = require("../config/dbConnect");
const multer = require('multer')

module.exports = {
    productInfo : async(req:Request,res:Response) => {
        const sql = 'select * from product where product_no = ?';
        const product_no = req.params.product_no;

        console.log(product_no);

        await connectionPool.query(sql,product_no,(err:any,rows:Array<String>,fields:Array<String>) => {
            if(rows.length > 0){
                res.status(200).send({userinfo : rows[0]})
            }else{
                res.status(400).send('계정이 존재하지 않습니다');
            }
        })
    },

    productInsert : async(req:Request,res:Response) => {

    },

    productDelete : async(req:Request,res:Response) => {
      const sql = 'delete from user where product_no = ?';
      const product_no = req.params.product_no;

      await connectionPool.query(sql,product_no,(err:any) => {
          if(err){
              res.status(400).send('계정이 존재하지 않습니다');
          }else{
              res.status(200).send('계정이 삭제됐습니다.');
          }
      })
    },

    userUpdateApi : async(req:Request,res:Response) => {
        const sql = 'select * from user where user_id = ?';
        const user_id = req.params.user_id;
        connectionPool.query(sql,user_id,(err:any,rows:any) => {
            if(err) {
                res.status(400).send('계정이 존재 하지 않습니다');
            }else{
                const sql2 = 'update user set user_name = ?,user_email =? where user_id = ?';
                const dataArray = new Array();
                rows.map((data:any) => {
                    dataArray.push(data);
                })

                let user_name = req.body.user_name;
                let user_email = req.body.user_email;
                let user_password = req.body.user_password;

                user_password = rows[0].user_password

                if(user_name == null){
                     user_name = rows[0].user_name;
                }
                if(user_email == null) {
                    user_email = rows[0].user_email;
                }

                connectionPool.query(sql2,[user_name,user_email,user_id],(err:any) => {
                    if(err) {
                        res.status(400).send('계정이 존재 하지 않습니다');
                    }else {
                        res.status(200).send('계졍이 성공적으로 변환 되었습니다');
                    }
                })
            }
        });




    }

}