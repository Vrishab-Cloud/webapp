const { PubSub } = require("@google-cloud/pubsub");
const logger = require("./logger").getLogger();

module.exports = {
  publishMessage: async (
    payload,
    name = process.env.GCP_PROJECT,
    topicName = process.env.TOPIC
  ) => {
    const pubSubClient = new PubSub({ name });

    logger.debug(payload);
    const dataBuffer = Buffer.from(JSON.stringify(payload));
    const topic = pubSubClient.topic(topicName);

    const messageId = await topic.publishMessage({ data: dataBuffer });
    logger.info(`Message ${messageId} published.`);
  },
};
