import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './router'

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:8080/')
})

const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB connected successfully')
    })
    .catch(err => {
        console.error('MongoDB connection error:', err)
    })
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/api/v1', router())
