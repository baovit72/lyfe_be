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

module.exports = { Group };
