const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    brokers:["192.168.7.51:9092"],
    clientId: 'my-app',
});