const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  // userID: {
  //   type: Sequelize.STRING,
  //   primaryKey: true
  // },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("password");
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  },
});

User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

const setSaltAndPassword = user => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;














// const Sequelize = require("sequelize");
// const db = require("../db");

// const User = db.define("user", {
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   email: { 
//     type: Sequelize.STRING, 
//     allowNull: false, 
//     validate: {isEmail: true}, 
//   },

//   imageUrl: {
//     type: Sequelize.STRING,
//     defaultValue: "https://placeholder.pics/svg/100x100/72FF59-7D63FF/83FF60-FFF08C/headshot",
//   },

//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },

//   lastName: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },


// });

// module.exports = User;
