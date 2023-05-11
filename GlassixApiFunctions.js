import axios from 'axios';
import logger from './logger/index.js'

axios.defaults.timeout = 15000

export const GetGlassixToken = async () => {
    const renewTokenPeriod = 10700000
    try {
      let res = await axios({
        method: 'post',
        url: 'https://app.glassix.com/api/v1.2/token/get',
        headers: { 'Content-type': 'application/json' },
        data: {
          apiKey: process.env.APIKEY,
          apiSecret: process.env.APISECRET,
          userName: process.env.USERNAMEDEP,
        },
      })
      globalAccessToken = res.data.access_token
      logger.info('Glassix token renew')
    } catch (err) {
      logger.error('Error GetGlassixToken: ' + err.response?.data?.message || err.message)
    }
    setTimeout(GetGlassixToken, renewTokenPeriod);
  }

  const getGlassixTicket = async (ticketId) => {
    try {
      const accessToken = globalAccessToken
      logger.info('getGlassixTicket')
    
      const res = await axios({
        method: 'get',
        url: `https://app.glassix.com/api/v1.2/tickets/get/${ticketId}`,
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      console.log('response getGlassixTicket');
      return res.data;
    }
    catch (error) {
      logger.error('getGlassixTicket Error' + error.response?.data?.message || error.message)
    } 
  };

  const getContact = async (contactId) => {
    try {
      logger.info('getContact'+contactId)
      const accessToken = globalAccessToken
      let res
      const options = {
        method: 'GET',
        url: `https://app.glassix.com/api/v1.2/contacts/get/${contactId}`,
        headers: {
          Accept: 'application/json', 'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      };
      res = await axios(options)
      return res.data
    } catch (err) {
      logger.error(`getContact: contactId: ${contactId} - ${err.response.data.message}`);
      return null
    }
  }
  const addTags = async (ticketId,tag) => {
    try {
      logger.info('addTags '+ticketId)
      //console.log("createTicket: data - "+ JSON.stringify(data));
      const res = {
        method: 'POST',
        url: `https://app.glassix.com/api/v1.2/tickets/addtags${ticketId}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalAccessToken}`
        },
        data: `['${tag}']`
      }
      const result = await axios(res)
      return result.data
    } catch (error) {
      logger.error("Error addTags: " + error.response?.data?.message || error.message)
      return null
    }
  }
  export { getGlassixTicket, addTags}