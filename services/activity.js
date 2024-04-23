const axios = require('axios');

async function fetchHuntrData(limit= null) {
    const token = process.env.ORG_TOKEN;
    let url = `https://api.huntr.co/org/activities`;
    if(limit) {
        url += `?limit=${limit}`
    }
    const headers = { 'Authorization': `Bearer ${token}` };
    const response = await axios.get(url, { headers });
    return response.data;
}

function memberActivity(data) {
    const processedData = data.map(activity => {
        const startAt = new Date(activity.startAt * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
        const createdAt = new Date(activity.createdAt * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
        const completedAt = activity.completedAt ? new Date(activity.completedAt * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }) : null;

        return {
            id: activity.id,
            title: activity.title,
            note: activity.note || "",
            completed: activity.completed,
            createdByWorkflow: activity.createdByWorkflow,
            startAt: startAt,
            createdAt: createdAt,
            completedAt: completedAt,
            ownerMember: {
                id: activity.ownerMember.id,
                givenName: activity.ownerMember.givenName,
                familyName: activity.ownerMember.familyName,
                email: activity.ownerMember.email,
                createdAt: new Date(activity.ownerMember.createdAt * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
                isActive: activity.ownerMember.isActive
            },
            job: activity.job ? {
                id: activity.job.id,
                title: activity.job.title,
                location: activity.job.location || {},
                createdAt: new Date(activity.job.createdAt * 1000).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
            } : null,
            employer: activity.employer ? {
                id: activity.employer.id,
                name: activity.employer.name,
                domain: activity.employer.domain,
                foundedYear: activity.employer.foundedYear,
                isPartner: activity.employer.isPartner,
                description: activity.employer.description,
                location: activity.employer.location || {}
            } : null,
            activityCategory: {
                id: activity.activityCategory.id,
                name: activity.activityCategory.name
            }
        };
    });
    return processedData;
}

module.exports = { fetchHuntrData, memberActivity };