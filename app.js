import express from 'express'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRouter.js'
import companyRoutes from './routes/companyRouter.js'
import jobRoutes from './routes/jobRouter.js'
import applicationRoutes from './routes/applicationRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './utils/mongoDB.js'
dotenv.config({})

const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true,
}

app.use(cors(corsOptions))


app.use('/api/v1/user', userRoutes)
app.use('/api/v1/company', companyRoutes)
app.use('/api/v1/job', jobRoutes)
app.use('/api/v1/application', applicationRoutes)

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    connectDb()
    console.log(`server is running on http://localhost:${PORT}`);
    
})


// backend = 3000 || 8000
// backend = 4000