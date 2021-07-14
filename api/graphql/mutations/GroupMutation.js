const merge = require("lodash.merge");

const { GroupType } = require("../types");
const { Group, User } = require("../../models");
const { GroupInputType } = require("../inputTypes");
const idService = require("../../services/id.service");

const updateGroup = {
  type: GroupType,
  description: "The mutation that allows you to update an existing Group by Id",
  args: {
    group: {
      name: "group",
      type: GroupInputType("update"),
    },
  },
  resolve: async (_, { group }, { userId }) => {
    const foundGroup = await Group.findByPk(group.id);
    if (!foundGroup) {
      throw new Error(`Group with id: ${group.id} not found!`);
    }
    const user = await User.findByPk(userId);
    if (foundGroup.ownerId !== user.id) {
      throw new Error(
        `User with id: ${group.id} not allowed to update this group!`
      );
    }
    const updatedGroup = merge(foundGroup, {
      name: group.name,
    });
    return foundGroup.update(updatedGroup);
  },
};

const createGroup = {
  type: GroupType,
  description: "The mutation that allows you to create a Group ",
  args: {
    group: {
      name: "group",
      type: GroupInputType("create"),
    },
  },
  resolve: async (_, { group }, { userId }) => {
    group.code = idService().encode((await Group.count()) + 1);
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with id: ${user.id} not found!`);
    }
    console.log(user);
    group.ownerId = userId;
    return Group.create(group);
  },
};

module.exports = {
  updateGroup,
  createGroup,
};
