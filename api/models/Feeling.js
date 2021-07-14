const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const { User } = require("./User");
const { Group } = require("./Group");
const { Emoticon } = require("./Emoticon");

const tableName = "feelings";

const Emothought = sequelize.define(
  "Feeling",
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emoticonId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Emoticon,
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
module.exports = { Emothought };
