const express=require("express")
const cryptojs=require('crypto-js') // hashing password
const jwt=require('jsonwebtoken') // create token

const pool =require('../db/pool') 
const result=require('../util/result')
const config=require('../util/config')


const router  = express.Router()

router.post('/signup',(request,response)=>{
    const {name,email,password,mobile}=request.body
    const sql=`INSERT INTO users(name,email,password,mobile)VALUES (?,?,?,?)`
    const hashedPassword=cryptojs.SHA256(password).toString()
    pool.query(sql,[name,email,hashedPassword,mobile],(error,data)=>{
        response.send(result.createResult(error,data))
    })

})

router.post('/signin',(request,response)=>{
    const {email,password} = request.body
    const hashedPassword=cryptojs.SHA256(password).toString()
    const sql =` SELECT *FROM users WHERE email=? AND password=?`
    pool.query(sql,[email,hashedPassword],(error,data)=>{
        if(error)
            response.send(result.createResult(error))
        else if (data.length == 0)
            response.send(result.createResult("Invalid email or password"))
        else{
             const user =data[0]
             //create the jwt token
             //inside the playload store the data that needs to be encryted into the token
             const playload ={
                uid: user.uid,
                email : user.email
             }
             const token =jwt.sign(playload,config.SECRET)
             const userData={
                name:user.name,
                mobile:user.mobile,
                token
             }
            response.send(result.createResult(null,userData))
        }
    })
})

router.get('/',(request,response)=>{
    const email=request.headers.email
    const sql=`SELECT * FROM users WHERE email=?`
    pool.query(sql,[email],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})



router.delete('/',(request,response)=>{
    const uid=request.headers.uid
    const sql=`DELETE FROM users WHERE uid=?`
    pool.query(sql,[uid],(error,data)=>{
        response.send(result.createResult(error,data))
    })

})


module.exports=router


