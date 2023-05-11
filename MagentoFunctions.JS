import axios from 'axios';
import logger from './logger/index.js'

axios.defaults.timeout = 15000

export const magentoOrder = async (orderId,method) => {
  try {
    logger.info(`magentoOrder: ${orderId},${method}`)
    let res = await axios({
        method: 'put',
        url: 'https://www.terminalx.com/po_zendesk/info/glassix/?targetEnv=magento',
        headers: { 'Content-type': 'application/json' },
        auth: {
          "username": process.env.MAGENTO_USERNAME,
          "password": process.env.MAGENTO_PASSWORD
        },
        data: {
          "order_id": `${orderId}`,
          "token": `${process.env.MAGENTO_TOKEN}`,
          "method": `${method}`
        }
    }) 
    logger.info(`magentoOrder data : ${res}`)
    return res.data
  } catch (err) {
      logger.error('Error magentoOrder: ' + err)
  }
}

export const magentoEmail = async (email,method) => {
  try {
    logger.info(`magentoEmail: ${email},${method}`)
    let res = await axios({
        method: 'put',
        url: 'https://www.terminalx.com/po_zendesk/info/glassix/?targetEnv=magento',
        headers: { 'Content-type': 'application/json' },
        auth: {
          "username": process.env.MAGENTO_USERNAME,
          "password": process.env.MAGENTO_PASSWORD
        },
        data: {
          "email": `${email}`,
          "token": process.env.MAGENTO_TOKEN,
          "method": `${method}`
        }
    }) 
    return res.data
  } catch (err) {
      logger.error('Error magentoEmail: ' + err.res?.data?.message || err.message)
  }
}