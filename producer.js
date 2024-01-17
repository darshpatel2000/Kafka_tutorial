const { kafka } = require('./client');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function init() {
    const producer = kafka.producer();
    console.log('producer connecting');
    await producer.connect();
    console.log('producer connected');

    rl.setPrompt('>');
    rl.prompt();

    rl.on('line', async (line) => { 
        const [riderNmae, location] = line.split(' ');
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() == 'north' ? 0 : 1,
                    key: 'location update',
                    value: JSON.stringify({ name: riderNmae, loc: location }),
                },
            ],
        }); 
    }).on("close", async () => {
        await producer.disconnect();
    });
}

init();