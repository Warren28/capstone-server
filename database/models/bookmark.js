const Sequelize = require("sequelize");
const db = require("../db");

const Bookmark = db.define("bookmark", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },

  ingredients: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://placeholder.pics/svg/100x100/72FF59-7D63FF/83FF60-FFF08C/headshot",
  },
});

module.exports = Bookmark;
