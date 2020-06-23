var express = require("express");
var router = express.Router();
const { User, Bookmark } = require("../database/models");

/* GET all campuses. */
// /api/campuses
router.get("/", async (req, res, next) => {
  // try to get campuses object from database
  try {
    // campuses will be the result of the Campus.findAll promise
    const bookmarks = await Bookmark.findAll();
    // if campuses is valid, it will be sent as a json response
    console.log(bookmarks);
    res.status(200).json(bookmarks);
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
    const bookmarks = await Bookmark.findByPk(id);

    if (bookmarks !== null) {
      //console.log(user.password);
      res.status(200).json(bookmarks);
    } else {
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
  const { title, ingredients } = req.body;
  // Create a campus object
  const bookmarkObj = { ...req.body };
  // const bookmarks = await Bookmark.findAll();
  // for (let i =0; i <bookmarks.length; i++){
  //  if ( bookmarkObj.title === bookmarks[]){

  //  }

  // }

  try {
    // Create a new campus on the database

    const newBookmark = await Bookmark.create(bookmarkObj);
    // The database would return a campus
    // send that campus as a json to the client
    res.status(201).send(newBookmark);
  } catch (err) {
    next(err);
  }
});

// router.get("/:id/users", async (req, res, next) => {
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
// });

// Route to handle editing a campus
// /api/campuses/:id
// /api/campuses/456 would modify a campus with id 456
router.put("/:id", async (req, res, next) => {
  // get the id from request params
  const { id } = req.params;
  // get form data from the request body
  const updatedObj = { ...req.body };
  try {
    // if successfull:
    // Find a campus with a matching id from the database
    const bookmarks = await Bookmark.findByPk(id);
    // database would return a valid campus object or an error
    //console.log(updatedObj);
    // modify the campus object with new form data
    await bookmarks.set(updatedObj);
    // save the new campus object to the data
    // database would return a new campus object
    const updatedBookmark = await bookmarks.save();
    //console.log(updatedCampus);
    // send the newCampus as a response from the API
    res.status(201).send(updatedBookmark);
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
    const bookmarks = await Bookmark.findByPk(id);
    // invoke the .destroy() method on the returned campus
    await bookmarks.destroy();
    // send a success message to the client
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
