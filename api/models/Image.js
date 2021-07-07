const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "images";

const Image = sequelize.define(
  "Image",
  {
    alt: {
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
