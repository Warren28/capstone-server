const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: { 
    type: Sequelize.STRING, 
    allowNull: false, 
    validate: {isEmail: true}, 
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://placeholder.pics/svg/100x100/72FF59-7D63FF/83FF60-FFF08C/headshot",
  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },


});

module.exports = User;
