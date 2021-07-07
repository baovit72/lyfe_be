const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const { User } = require("./User");
const { Group } = require("./Group");

const tableName = "chats";

const Chat = sequelize.define(
  "Chat",
  {
    text: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    videoUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    senderId: {
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
module.exports = { Chat };
