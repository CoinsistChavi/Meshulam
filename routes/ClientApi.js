import express from 'express'
import logger from '../logger/index.js'
import axios from 'axios'
import fs from 'fs'

const router = express.Router()
const template = fs.readFileSync(`./static/index.html`, 'utf-8')

export default router.get('/Subjects', async(req, res) => {
    try {
        console.log("got here");
        const data = clientArray
        let companyNameArray = []
        let CompanyData = "<option value='0'></option>"
        Object.keys(data).forEach(async function(k){
            console.log(k + ' - ' + data[k].Subject);
            if (!companyNameArray.includes(data[k].Subject)) {
                companyNameArray.push(data[k].Subject);
                CompanyData += "<option value='"+data[k].Subject+"'>"+data[k].Subject+"</option>"
            }
        });
        let output = template.replace('{%SUBJECT%}', CompanyData)
        return res.end(output)
    } catch (error) {
        logger.error("Subjects Error: " +error)
        return res.status(400).json({ success: false });
    }
})