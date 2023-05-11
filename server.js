import express from 'express'
import cors from 'cors'
import route from './routes/ClientApi.js'
import dotenv from 'dotenv'
import { GetGlassixToken } from "./GlassixApiFunctions.js";
import { getData } from "./controller/googleSheets/getData.js"

import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import { dirname } from 'path';
const __dirname = dirname(__filename);
import path from 'path'

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')))

await getData()

fs.writeFileSync("./static/subjectsArr.json", JSON.stringify(clientArray))

app.use('/api', route);

global.globalAccessToken = "";
await GetGlassixToken();

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))