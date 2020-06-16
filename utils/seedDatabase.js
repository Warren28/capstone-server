const { User, Bookmark } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([
    User.create({
      username: "Kyrie Irving",
      password: "111111",
    }),
    User.create({
      username: "Kyrie Ma",
      password: "11111233",
    }),
    User.create({
      username: "Kyrie John",
      password: "11111423411",
    }),
    Bookmark.create({
      title: "Cheese Sandwich",
      ingredients: "cheese",
    }),
    Bookmark.create({
      title: "Best Nooodle The World",
      ingredients: "noodle",
    }),
  ]);
};

module.exports = seedDatabase;
