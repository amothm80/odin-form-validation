// controllers/usersController.js
const { query } = require("express");
const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name must not be empty")
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name must not be empty")
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage(`Must be avalid email`),
  body("age")
    .trim()
    .escape()
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage(`Age must be in numbers, between 18 and 120`),
  body("bio")
    .trim()
    .escape()
    .optional({ values: "falsy" })
    .isLength({ max: 200 })
    .withMessage("Bio max is 200 letters"),
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.usersSearch = (req,res)=>{
  console.log(`query is ${req.query.query}`)
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).render('index',{title: "User list"})
  }

  res.render("searchResult", {
    title: "Search Result",
    results: usersStorage.searchUser(req.query.query),
  });
}