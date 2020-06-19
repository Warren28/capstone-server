const express = require("express");
const router = express.Router();
const { User, Bookmark } = require("../database/models");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).send("Wrong username and/or password");
    }
    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send("Wrong username and/or password");
    }
    else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  }
  catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  }
  catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    }
    else {
      next(err);
    }
  }
});

router.get("/", async (req, res, next) => {
  // try to get users object from database
  try {
    // users will be the result of the User.findAll promise
    const users = await User.findAll({include: Bookmark});
    // if users is valid, it will be sent as a json response
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(204).end();
    }
  });
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;