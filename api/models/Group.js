const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "groups";

const { User } = require("./User");

const Group = sequelize.define(
  "Group",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User, // 'Movies' would also work
        key: "id",
      },
    },
  },
  { tableName }
);

const GroupDetail = sequelize.define(
  "GroupDetail",
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User, // 'Movies' would also work
        key: "id",
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Group, // 'Movies' would also work
        key: "id",
      },
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  },
  { tableName }
);

Group.belongsToMany(User, { through: GroupDetail });
module.exports = { Group };
