const { kafka } = require('./client');

async function init() {
    const admin = kafka.admin();
    console.log('admin connecting');
    admin.connect();
    console.log('admin connected');

    console.log('admin creating topics');
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2,
                replicationFactor: 1,
            },
        ],
    });
    console.log('admin topics created');

    console.log('admin disconnecting');
    await admin.disconnect();

}

init();
