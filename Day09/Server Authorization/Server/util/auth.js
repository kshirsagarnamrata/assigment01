const jwt =require('jsonwebtoken')

const config=require('./config')
const result=require('./result')

function authUser(request,response,next){
    //for even incoming request this middleware will be called

    const allAllowedUrls=['/user/signin','/user/signup']
    if(allAllowedUrls.includes(request.url))
        next()
    else{
        const token=request.headers.token
        if(!token)
            response.send(result.createResult('Token is missing'))
        else{
            try{
                const playload=jwt.verify(token,config.SECRET)
                //request.header.playload=playload
                //decription
                request.headers.uid=playload.uid
                request.headers.email=playload.email
                next()
                //authorization()
            } catch(ex){
                response.send(result.createResult('Token is Invalid'))
            }
        }
    }
}


module.exports =authUser