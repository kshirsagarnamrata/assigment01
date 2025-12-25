const express=require("express")
const cryptojs=require('crypto-js') // hashing password
const jwt=require('jsonwebtoken') // create token

const pool =require('../db/pool') 
const result=require('../util/result')
const config=require('../util/config')


const router  = express.Router()


router.get('/',(request,response)=>{
    const {name,brand,description,price}=request.headers.email
    const sql=`SELECT * FROM Stationery `
    pool.query(sql,[name,brand,description,price],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})




module.exports=router