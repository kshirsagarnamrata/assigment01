const express=require("express")
const cryptojs=require('crypto-js')
const pool =require('../db/pool')
const result=require('../util/result')


const router  =express.Router()

router.post('/signup',(request,response)=>{
    const {name,email,password,mobile}=request.body
    const sql=`INSERT INTO users(name,email,password,mobile)VALUES (?,?,?,?)`
    const hashedPassword=cryptojs.SHA256(password).toString()
    pool.query(sql,[name,email,password,mobile],(error,data)=>{
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
            //JWT
            response.send(result.createResult(null,data))
        }
    })
})

// query parameters
router.get('/',(request,response)=>{
    const {email}=request.query
    const sql=`SELECT * FROM users WHERE email=?`
    pool.query(sql,[email],(error,data)=>{
        response.send(result.createResult(error,data))
    })
})


//request parameters
router.delete('/:uid',(request,response)=>{
    const uid=request.params.uid
    const sql=`DELETE FROM users WHERE uid=?`
    pool.query(sql,[uid],(error,data)=>{
        response.send(result.createResult(error,data))
    })

})


module.exports=router


