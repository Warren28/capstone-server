const Sequelize = require("sequelize");
const db = require("../db");

const Bookmark = db.define("bookmark", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ingredients: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Bookmark;
