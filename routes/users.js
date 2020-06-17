var express = require("express");
var router = express.Router();
const { User } = require("../database/models");
const Bookmark = require("../database/models/bookmark");

/* GET all users. */
// /api/users
router.get("/", async (req, res, next) => {
  // try to get users object from database
  try {
    // users will be the result of the User.findAll promise
    const users = await User.findAll({ include: Bookmark });
    // if users is valid, it will be sent as a json response
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

// Route to serve single user based on its id
// /api/users/:id
// /api/users/456 would respond with a user with id 456

router.get("/:id", async (req, res, next) => {
  // take the id from params
  const { id } = req.params;
  // query the database for a campus with matching id

  try {
    // if successful:
    //const user = await User.findByPk(id);
    // send back the user as a response
    const user = await User.findOne({
      where: {id: id},
      include: Bookmark,
  });
  //const user = await User.findByPk(id);
    
    if (user !== null){
      //console.log(user.password);
      res.status(200).json(user);
    }else{
      res.status(200).json("The user doesn't not exist!");
    }
  } catch (err) {
    // if error:
    // handle error
    next(err);
  }
});

// Route to handle adding a campus
// /api/users/
router.post("/", async (req, res, next) => {
  // Take the form data from the request body
  const userObj = { ...req.body };
  try {
    // Create a new user on the database
    const newUser = await User.create(userObj);
    // The database would return a user
    // send that user as a json to the client
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});



// Route to handle editing a user
// /api/users/:id
// /api/users/456 would modify a campus with id 456
router.put("/:id", async (req, res, next) => {
  // get the id from request params
  const { id } = req.params;
  const updatedObj = { ...req.body };
  try {
    // if successfull:
    // Find a user with a matching id from the database
    const user = await User.findByPk(id, {include: Bookmark});
    // database would return a valid user object or an error
    //console.log(updatedObj);
    // modify the user object with new form data
    await user.set(updatedObj);
    // save the new user object to the data
    // database would return a new user object
    const updatedUser = await user.save();
    //console.log(updatedCampus);
    // send the newUser as a response from the API
    res.status(201).send(updatedUser);
  } catch (err) {
    // if error:
    // handle the error
    next(err);
  }
});



// Route to handle removing a user
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  // get an id for a user to delete
  try {
    // pass the id to the database to find user to be deleted
    // database would either respond succcess or fail
    const user = await User.findByPk(id);
    // invoke the .destroy() method on the returned user
    await user.destroy();
    // send a success message to the client
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/bookmarks", async (req, res, next) => {
  const { id } = req.params;
  // find the campus associated with the id
  let foundUsers;
  try {
    foundUsers = await User.findByPk(id);
  } catch (err) {
    next(err);
  }

  try {
    if (foundUsers !== null){
      const bookmarksOfuser = await foundUsers.getBookmarks();
      if(bookmarksOfuser.length !== 0) res.status(200).json(bookmarksOfuser);
      else res.status(200).json("No Bookmark!");
    }else{
      res.status(200).json("The user doesn't not exist!");
    }

  } catch (err) {
    next(err);
  }
});

module.exports = router;
