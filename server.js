import express from 'express'
import cors from 'cors' 
import route from './routes/ClientApi.js'
import dotenv from 'dotenv'
import { getData } from "./controller/googleSheets/getData.js"
import fs from 'fs'

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', route);

await getData()

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))