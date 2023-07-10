import axios from 'axios';
import logger from './logger/index.js'

axios.defaults.timeout = 15000

const renewTokenPeriod = 10700000

export const GetGlassixToken = async () => {   
    try {
      let res = await axios({
        method: 'post',
        url: `https://${process.env.SUBDOMAIN}.glassix.com/api/v1.2/token/get`,
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
        url: `https://${process.env.SUBDOMAIN}.glassix.com/api/v1.2/tickets/get/${ticketId}`,
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
        url: `https://${process.env.SUBDOMAIN}.glassix.com/api/v1.2/contacts/get/${contactId}`,
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
      logger.info('addTags '+ticketId+", "+tag)
      //console.log("createTicket: data - "+ JSON.stringify(data));
      const res = {
        method: 'POST',
        url: `https://${process.env.SUBDOMAIN}.glassix.com/api/v1.2/tickets/addtags/${ticketId}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalAccessToken}`
        },
        data: [`${tag}`]
      }
      const result = await axios(res)
      return result.data
    } catch (error) {
      logger.error("Error addTags: " + error)
      return null
    }
  }
  const GetGlassixTokenUser = async (username) => {
    try {
      let res = await axios({
        method: 'post',
        url: 'https://app.glassix.com/api/v1.2/token/get',
        headers: { 'Content-type': 'application/json' },
        data: {
          apiKey: process.env.APIKEY,
          apiSecret: process.env.APISECRET,
          userName: username
        },
      })
        logger.info('Glassix token User renew: '+username)
        tokenMap.set(username, res.data.access_token)
        setTimeout(() => {tokenMap.delete(username)}, renewTokenPeriod);
        return res.data.access_token
    } catch (err) {
      logger.error('Error GetGlassixTokenUser: ' + err)
      return null
    }
  }

  const createTicketUser = async (userEmail,data) => {
    try {
      logger.info('createTicket')
      const accessToken = tokenMap.get(userEmail)
      const accessTokenUser = accessToken ? accessToken : await GetGlassixTokenUser(userEmail)
      if(accessTokenUser==null)
          return null
      //console.log("createTicket: data - "+ JSON.stringify(data));
      const res = {
        method: 'POST',
        url: `https://app.glassix.com/api/v1.2/tickets/create`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessTokenUser}`
        },
        data: data
      }
      const result = await axios(res)
      return result.data
    } catch (error) {
      logger.error("Error createTicket: "+ error)
      return null
    }
  }

  const addNotes = async (ticketId, text) => {
    try {
    logger.info("addNotes "+ticketId)
    const options = {
      method: 'POST',
      url: `https://app.glassix.com/api/v1.2/tickets/addnote/${ticketId}`,
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
        Authorization: `Bearer ${globalAccessToken}`
      },
      data: {text: `${text}`}
    };
      const res = await axios(options)
    } catch (error) {
      logger.error(`add Notes Error: `+ error)
    }
  }

  const audiolink = async (ticketId, audioUri) => {
    try {
    logger.info("audiolink "+ticketId)
    const options = {
      method: 'POST',
      url: `https://app.glassix.com/api/v1.2/phonecalls/audiolink/${ticketId}`,
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json',
        Authorization: `Bearer ${globalAccessToken}`
      },
      data: {audioUri: `${audioUri}`}
    };
      const res = await axios(options)
    } catch (error) {
      logger.error(`audiolink Error: `+ error)
    }
  }

  export { getGlassixTicket, addTags, createTicketUser, addNotes, audiolink}