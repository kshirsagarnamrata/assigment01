const express= require('express')
const cors= require('cors')

const userRouter =require('./router/user')
const authUser=require('./util/auth')
const stationaryRouter=require('./router/Stationery')
const app = express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(authUser)
app.use('/user',userRouter)
app.use('/stationery',stationaryRouter)


app.listen(4000, 'localhost',()=>{
    console.log(`server is running at PORT 4000`);
});