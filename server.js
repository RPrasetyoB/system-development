const cron = require('node-cron');
const { DateTime } = require('luxon');
const { fetchHuntrData, memberActivity } = require('./services/activity');
const { updateGoogleSheets } = require('./services/googleSheet')
require('dotenv').config();

// async function runAutomation() {
//     try {
//         const jakartaTime = DateTime.now().setZone('Asia/Jakarta');
//         const formattedDate = jakartaTime.toISODate();
//         const rangeName = formattedDate;
//         const huntrData = await fetchHuntrData();
//         const groupedData = memberActivity(huntrData.data);
//         await updateGoogleSheets(groupedData, rangeName);
        
//         console.log('Automation ran successfully on tuesday.');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// cron.schedule('57 20 * * 2', () => {
//     runAutomation();
// }, {
//     scheduled: true,
//     timezone: "Asia/Jakarta"
// })


// for test run without schedule time
async function main() {
    try {
        const huntrData = await fetchHuntrData(8);
        const groupedData = memberActivity(huntrData.data);
        await updateGoogleSheets(groupedData, "week2");
    } catch (error) {
        console.error('Error:', error);
    }
}

main();