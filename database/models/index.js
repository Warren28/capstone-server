// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const User = require("./userInfo");
const Bookmark = require("./bookmark");
module.exports = {
  User,
  Bookmark,
};
