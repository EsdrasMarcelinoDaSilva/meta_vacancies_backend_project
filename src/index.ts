import express from 'express'
import dotenv from 'dotenv'
import { asciiArt } from './tools/asscii-art'
import { Database } from './database/Database'
import { routes } from '.././routes'


dotenv.config()
Database.lift()

const  path = express()
const port  = process.env.PORT || 9090

path.use(express.json())
path.use(routes)

path.listen(port, () => console.log(`✅ full steam ahead at http://localhost${port}${asciiArt}`))