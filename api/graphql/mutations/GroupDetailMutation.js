const merge = require("lodash.merge");

const { GroupDetailType } = require("../types");
const { Group, User, GroupDetail } = require("../../models");
const { GroupDetailInputType } = require("../inputTypes");

const joinGroup = {
  type: GroupDetailType,
  description: "The mutation that allows you put user to a group",
  args: {
    group: {
      name: "group",
      type: GroupDetailInputType("create"),
    },
  },
  resolve: async (_, { group }, { userId }) => {
    const foundGroup = await Group.findOne({ where: { code: group.code } });
    if (!foundGroup) {
      throw new Error(`Group with code: ${group.code} not found!`);
    }
    const user = await User.findByPk(userId);

    const groupDetail = await GroupDetail.findOne({
      where: { userId: user.id, groupId: foundGroup.id, active: true },
    });
    if (groupDetail) {
      throw new Error(`User's already in a group`);
    }

    return GroupDetail.create({
      userId: user.id,
      groupId: foundGroup.id,
    });
  },
};

const leaveGroup = {
  type: GroupDetailType,
  description: "The mutation that allows you to leave a group ",
  args: {
    group: {
      name: "group",
      type: GroupDetailInputType("update"),
    },
  },
  resolve: async (_, { group }, { userId }) => {
    const foundGroup = await Group.findOne({ where: { code: group.code } });
    if (!foundGroup) {
      throw new Error(`Group with code: ${group.code} not found!`);
    }
    const user = await User.findByPk(userId);

    const groupDetail = await GroupDetail.findOne({
      where: { userId: user.id, groupId: foundGroup.id, active: true },
    });

    if (!groupDetail) {
      throw new Error(`User's not in this group`);
    }
    return groupDetail.update({
      ...groupDetail,
      active: false,
    });
  },
};

module.exports = {
  leaveGroup,
  joinGroup,
};
