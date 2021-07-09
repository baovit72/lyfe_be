const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const GroupType = new GraphQLObjectType({
  name: "Group",
  description: "This represents a Group",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (group) => group.id,
    },
    name: {
      type: GraphQLString,
      resolve: (group) => group.name,
    },
    code: {
      type: GraphQLString,
      resolve: (group) => group.code,
    },
    ownerId: {
      type: GraphQLInt,
      resolve: (group) => group.ownerId,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (group) => group.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (group) => group.updatedAt,
    },
  }),
});

module.exports = { GroupType };
