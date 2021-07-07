const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "emoticons";

const Emoticon = sequelize.define(
  "Emoticon",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { tableName }
);
module.exports = { Emoticon };
