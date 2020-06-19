const { User, Bookmark } = require("../database/models");

const seedDatabase = async () => {
  await Promise.all([
    User.create({
      //username: "KI",
      password: "111111",
      email: "123@example.com",
      //firstName: "Kyrie",
      //lastName:"Irving"
      //userID: "1",
    }),
    User.create({
      //username: "KD",
      password: "111111",
      email: "1234@example.com",
      //firstName: "Kevin ",
      //lastName:"Durant"
      //userID: "2",
    }),
    User.create({
      //username: "AI",
      password: "111111",
      email: "12345@example.com",
      //firstName: "Allen",
      //lastName:"Iverson"
      //userID: "3",
    }),
  ]);
  await Promise.all([
    Bookmark.create({
      title: "Cheese Sandwich",
      ingredients: "cheese",
      userId: 1,
    }),
    Bookmark.create({
      title: "Best Nooodle The World",
      ingredients: "noodle",
      userId: 2,
    }),
  ]);
};

module.exports = seedDatabase;
