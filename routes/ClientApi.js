import express from 'express'
import logger from '../logger/index.js'
import fs from 'fs'
import { addTags } from "../GlassixApiFunctions.js"

const router = express.Router()

const template = fs.readFileSync(`./static/index.html`, 'utf-8')

router.get('/SubjectsIframe', async (req, res) => {
    try {
        logger.info("SubjectsIframe" + req.query.ticketId)
        //const ticketId = req.query.ticketId
        //fs.writeFileSync('./static/subjectsArr.json', JSON.stringify(clientArray));
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
    } catch (err) {
        logger.error("SubjectsIframe error-" + err)
        return res.status(200).send("לקוח לא נמצא במג'נטו")
    }
})

router.post('/AddTags', async (req, res) => {
    try {
        logger.info("AddTags" + req.body.ticketId)
        await addTags(req.body.ticketId,req.body.tag)
        return res.status(200).json({success: true})
    } catch (err) {
        logger.error("MagentoInfo-Iframe error-" + err)
        return res.status(200).json({success: false})
    }
})

export default router
