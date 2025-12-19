const express= require('express')
const userRouter =require('./router/user')

const app = express()

app.use(express.json());
//create middleware
app.use((request,response,next)=>{
    const path=request.url
    if(path=='/user/signin'|| path == '/user/signup')
        next()
    else{
        response.send('you need to be authorized')
    }

})

app.use('/user',userRouter)

app.listen(4000, 'localhost',()=>{
    console.log(`server is running at PORT 4000`);
});