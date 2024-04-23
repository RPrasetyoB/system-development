const { google } = require('googleapis');

async function updateGoogleSheets(memberActivityData, sheetName) {
    const clientEmail = process.env.CLIENT_EMAIL;
    const privateKey = process.env.PRIVATE_KEY;
    const auth = new google.auth.JWT(
            clientEmail,
            null,
            privateKey,
            ['https://www.googleapis.com/auth/spreadsheets']
        );
    const sheets = google.sheets({ version: 'v4', auth: auth });
    const spreadsheetId = '1_toQXhWmJjZ38j_Zks22E43m2OEuNhgKKY_kcUMfUPQ';
    const header = [
        'ID', 
        'Title', 
        'Note', 
        'Completed', 
        'Created By Workflow', 
        'Start At', 
        'Created At', 
        'Completed At', 
        'Owner Member ID', 
        'Owner Member Given Name', 
        'Owner Member Family Name', 
        'Owner Member Email', 
        'Owner Member Created At', 
        'Owner Member Is Active',
        'Job ID', 
        'Job Title', 
        'Job Location', 
        'Job Created At', 
        'Employer ID', 
        'Employer Name', 
        'Employer Domain', 
        'Employer Founded Year', 
        'Employer Is Partner', 
        'Employer Description', 
        'Employer Location', 
        'Activity Category ID', 
        'Activity Category Name'
    ];
    const values = [header, ...memberActivityData.map(activity => [
        activity.id,
        activity.title,
        activity.note,
        activity.completed,
        activity.createdByWorkflow,
        activity.startAt,
        activity.createdAt,
        activity.completedAt,
        activity.ownerMember.id,
        activity.ownerMember.givenName,
        activity.ownerMember.familyName,
        activity.ownerMember.email,
        activity.ownerMember.createdAt,
        activity.ownerMember.isActive,
        activity.job ? activity.job.id : '',
        activity.job ? activity.job.title : '',
        activity.job && activity.job.location ? JSON.stringify(activity.job.location) : '',
        activity.job ? activity.job.createdAt : '',
        activity.employer ? activity.employer.id : '',
        activity.employer ? activity.employer.name : '',
        activity.employer ? activity.employer.domain : '',
        activity.employer ? activity.employer.foundedYear : '',
        activity.employer ? activity.employer.isPartner : '',
        activity.employer ? activity.employer.description : '',
        activity.employer && activity.employer.location ? JSON.stringify(activity.employer.location) : '',
        activity.activityCategory.id,
        activity.activityCategory.name
    ])];

    try {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests: [{
                    addSheet: {
                        properties: {
                            title: sheetName,
                        },
                    },
                }],
            },
        });

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A1`, // Specify the range for writing data
            valueInputOption: 'RAW',
            resource: { values },
        });

        console.log(`Data updated successfully in sheet '${sheetName}'.`);
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {updateGoogleSheets}