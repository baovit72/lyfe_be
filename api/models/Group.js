const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "groups";

const { User } = require("./User");

const Group = sequelize.define(
  "Group",
  {
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

module.exports = { Group };
