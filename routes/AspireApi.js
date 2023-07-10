import express from 'express'
import logger from '../logger/index.js'
import { createTicketUser, addNotes, audiolink } from "../GlassixApiFunctions.js"

const routerAspire = express.Router()

routerAspire.post('/PhoneCalls', async (req, res) => {
    try {
        logger.info("PhoneCalls" + req.query.direction +JSON.stringify(req.body))
        let phone = req.body.CLID
        const direction = req.query.direction==1 ? 'שיחה יוצאת' : 'שיחה נכנסת'
        phone = phone.startsWith("0") ? phone.replace("0", "972") : phone
        const data = {
            culture: 'he-IL',
            participants: [
              {
                type: 'Client',
                protocolType: 'PhoneCall',
                isActive: true,
                isDeleted: false,
                identifier: phone
              }
            ],
            state: 'Open',
            getAvailableUser: false,
            addIntroductionMessage: false,
            enableWebhook: true,
            markAsRead: false,
            field1: direction
          }
          const userEmail = req.body.ATTACHDATA1
          const newTicket = await createTicketUser(userEmail,data)
          if(newTicket){
            const text = ` ${direction}\n משוייך למייל ${userEmail}\n שלוחה - ${req.body.EXTENSIONNUMBER}\n תחילת שיחה ${req.body.STARTTALKTS}\n סיום שיחה ${req.body.ENDTALKTS}\n משך זמן השיחה ${req.body.TOTALTALKTIME}`  
            await addNotes(newTicket.id, text)
            const audioUri = req.body.RECORDINGPATH
            await audiolink(newTicket.id, audioUri)
          }
        return res.status(200).json({success: true})
    } catch (err) {
        logger.error("PhoneCalls error-" + err)
        return res.status(400).json({success: false})
    }
})

export default routerAspire
