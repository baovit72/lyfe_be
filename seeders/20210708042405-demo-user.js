"use strict";

const bcryptService = require("../api/services/bcrypt.service");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "testuser1",
          name: "Bảo Hồ",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail@gmail.com",
          phone: "0855765343",
          avtUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "testuser2",
          name: "Bảo Hồ",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail2@gmail.com",
          phone: "0855765344",
          avtUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "testuser3",
          name: "Bảo Hồ",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail3@gmail.com",
          phone: "0855765345",
          avtUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "testuser4",
          name: "Bảo Hồ",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail4@gmail.com",
          phone: "0855765346",
          avtUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "testuser5",
          name: "Bảo Hồ",
          password: bcryptService().password({ password: "testpassword" }),
          email: "testemail5@gmail.com",
          phone: "0855765347",
          avtUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
