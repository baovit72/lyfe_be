const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "emoticons";

const { Media } = require("./Media");

const Emoticon = sequelize.define(
  "Emoticon",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Media,
        key: "id",
      },
    },
  },
  { tableName }
);
module.exports = { Emoticon };
