const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const { User } = require("./User");
const { Group } = require("./Group");

const tableName = "DiaryItems";

const Chat = sequelize.define(
  "DiaryItems",
  {
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Group,
        key: "id",
      },
    },
  },
  { tableName }
);
module.exports = { DiaryItems };
