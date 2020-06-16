var express = require("express");
var router = express.Router();
const { User } = require("../database/models");

/* GET all campuses. */
// /api/campuses
router.get("/", async (req, res, next) => {
  // try to get campuses object from database
  try {
    // campuses will be the result of the Campus.findAll promise
    const users = await User.findAll();
    // if campuses is valid, it will be sent as a json response
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

// Route to serve single campus based on its id
// /api/campuses/:id
// /api/campuses/456 would respond with a campus with id 456

router.get("/:id", async (req, res, next) => {
  // take the id from params
  const { id } = req.params;
  // query the database for a campus with matching id

  try {
    // if successful:
    //const campus = await Campus.findByPk(id);
    // send back the campus as a response
  //   const user = await User.findOne({
  //     where: {id: id},
  //     include: Student,
  // });
  const user = await User.findByPk(id);
    
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
// /api/campuses/
router.post("/", async (req, res, next) => {
  // Take the form data from the request body
  const { username, password } = req.body;
  // Create a campus object
  const userObj = {
    username: username,
    password: password,
  };
  try {
    // Create a new campus on the database
    const newUser = await User.create(userObj);
    // The database would return a campus
    // send that campus as a json to the client
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});

// router.get("/:id/password", async (req, res, next) => {
//   const { id } = req.params;
//   // find the campus associated with the id
//   let foundUsers;
//   try {
//     foundUsers = await User.findByPk(id);
//   } catch (err) {
//     next(err);
//   }

//   try {
//     if (foundUsers !== null){
//       const passwordOfUser = await foundUsers.password;
//       if(passwordOfUser.length !== 0) res.status(200).json(passwordOfUser);
//       else res.status(200).json("No students!");
//     }else{
//       res.status(200).json("The college doesn't not exist!");
//     }

//   } catch (err) {
//     next(err);
//   }

// Route to handle editing a campus
// /api/campuses/:id
// /api/campuses/456 would modify a campus with id 456
router.put("/:id", async (req, res, next) => {
  // get the id from request params
  const { id } = req.params;
  // get form data from the request body
  const { username, password } = req.body;
  const updatedObj = {
    username: username,
    password: password,
  };
  try {
    // if successfull:
    // Find a campus with a matching id from the database
    const user = await User.findByPk(id);
    // database would return a valid campus object or an error
    //console.log(updatedObj);
    // modify the campus object with new form data
    await user.set(updatedObj);
    // save the new campus object to the data
    // database would return a new campus object
    const updatedUser = await user.save();
    //console.log(updatedCampus);
    // send the newCampus as a response from the API
    res.status(201).send(updatedUser);
  } catch (err) {
    // if error:
    // handle the error
    next(err);
  }
});



// Route to handle removing a campus
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  // get an id for a campus to delete
  try {
    // pass the id to the database to find campus to be deleted
    // database would either respond succcess or fail
    const user = await User.findByPk(id);
    // invoke the .destroy() method on the returned campus
    await user.destroy();
    // send a success message to the client
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
