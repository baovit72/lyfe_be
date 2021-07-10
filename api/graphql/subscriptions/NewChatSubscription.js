const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ChatType } = require("./../types/ChatType");
const { withFilter } = require("apollo-server-express");

const newChatSubscription = {
  type: ChatType,
  subscribe: (_, args, { pubsub }) => {
    console.log("subscription now", pubsub);
    return pubsub.asyncIterator("NEW_CHAT");
  },
  resolve: (_, args, context) => {
    const { text } = _;
    console.log("received chat");

    return { text };
  },
};

module.exports = { newChatSubscription };
