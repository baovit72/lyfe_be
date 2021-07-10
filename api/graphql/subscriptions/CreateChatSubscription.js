const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ChatType } = require("./../types/ChatType");

const createChatSubscription = {
  type: ChatType,
  args: {
    text: {
      name: "text",
      type: GraphQLString,
    },
  },
  resolve: (_, { text }, { pubsub }) => {
    console.log("new chat");
    pubsub.publish("NEW_CHAT", { text });
    return { text };
  },
};

module.exports = { createChatSubscription };
