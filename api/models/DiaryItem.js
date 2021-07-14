const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const { User } = require("./User");
const { Group } = require("./Group");
const { Media } = require("./Media");

const tableName = "DiaryItems";

const Chat = sequelize.define(
  "DiaryItems",
  {
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Media,
        key: "id",
      },
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
