// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const User = require("./userInfo");
const Bookmark = require("./bookmark");


//User.hasMany(Bookmark);

//Bookmark.belongsTo(User);


module.exports = {
  User,
  Bookmark,
};
