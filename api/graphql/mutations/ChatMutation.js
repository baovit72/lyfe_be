const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { ChatInputType } = require("../inputTypes/ChatInputType");
const { ChatType } = require("../types/ChatType");

const sendChat = {
  type: ChatType,
  args: {
    chat: {
      name: "chat",
      type: ChatInputType("create"),
    },
  },
  resolve: (_, { chat }, { pubsub }) => {
    console.log("new chat");

    pubsub.publish("NEW_CHAT", { text: chat.text });
    return { text: chat.text };
  },
};

module.exports = { sendChat };
