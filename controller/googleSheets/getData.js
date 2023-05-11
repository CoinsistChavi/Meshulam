import { GoogleSpreadsheet } from 'google-spreadsheet';
import logger from '../../logger/index.js'
import fs from 'fs'
 
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const userSpace = require('../googleSheets/plasson-361007-145d619dcb72.json')

async function AccessSpreadSheet() {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('13IWrr-B_hTQTIYIWc2PuWPkFI2vT_4OWd6KE2uSt6Ks');

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
        client_email: userSpace.client_email,
        private_key: userSpace.private_key,
    });

    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title] or doc.sheetsByIndex[0]
    return sheet; 
}

const getData = async () => {
    logger.info('getData refresh') 
    global.clientArray = [];

    const sheet = await AccessSpreadSheet()
    const rows = await sheet.getRows(); 
    rows.forEach(column => { 
        clientArray.push({Subject: column["נושא"],SecSubject: column["תת נושא"],Tag: column["תיוג"]})
    });
    setTimeout(getData, 26000000);
}

export { getData }