import e, { Request, Response } from "express";

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
    }

}