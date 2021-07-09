const { GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { PubSub } = require("apollo-server-express");
const { ChatType } = require("./../types/ChatType");
const pubsub = new PubSub();

const createChatSubscription = {
  type: ChatType,
  args: {
    id: {
      name: "id",
      type: GraphQLInt,
    },
    name: {
      name: "name",
      type: GraphQLString,
    },
    code: {
      name: "code",
      type: GraphQLString,
    },
    ownerId: {
      name: "ownerId",
      type: GraphQLInt,
    },
  },
  subscribe: (_, args) => pubsub.asyncIterator(["NEW_CHAT"]),
};

module.exports = { createChatSubscription };
