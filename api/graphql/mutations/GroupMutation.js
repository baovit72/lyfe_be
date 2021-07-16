const merge = require("lodash.merge");

const { GroupType } = require("../types");
const { Group, User, GroupDetail } = require("../../models");
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
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with id: ${user.id} not found!`);
    }
    group.ownerId = userId;
    const groupDetail = await GroupDetail.findOne({
      where: { userId: user.id, active: true },
    });
    if (groupDetail) {
      throw new Error(`User's already in a group`);
    }
    const createdGroup = await Group.create(group);
    if (!group) {
      throw new Error(`Group not created!`);
    }
    createdGroup.code = idService().encode(await Group.count());
    console.log("create group", group);
    //Join group
    const createdGroupDetail = await GroupDetail.create({
      userId,
      groupId: await Group.count(),
    });
    console.log(createdGroupDetail);
    return createdGroup;
  },
};

module.exports = {
  updateGroup,
  createGroup,
};
