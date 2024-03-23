const { PubSub } = require("@google-cloud/pubsub");
const logger = require("./logger").getLogger();

module.exports = {
  publishMessage: async (
    payload,
    name = "dev-22983",
    topicName = "verify_email"
  ) => {
    const pubSubClient = new PubSub({ name });

    logger.debug(payload);
    const dataBuffer = Buffer.from(JSON.stringify(payload));

    try {
      const messageId = await pubSubClient
        .topic(topicName)
        .publishMessage({ data: dataBuffer });
      logger.info(`Message ${messageId} published.`);
      return messageId;
    } catch (error) {
      logger.error(`Received error while publishing: ${error.message}`);
      next(error);
    }
  },
};
