const express = require("express");
const router = express.Router();
const User = require("../models/User");
var ObjectId = require("mongoose").Types.ObjectId;

router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id).then(blog => {
    if (!!blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/", (req, res) => {
  const { firstName, lastName, email, social } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    social
  });
  newUser.save().then(user => res.status(201).json(user));
});

router.put("/:id", (req, res) => {
  const { firstName, lastName, email, social } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    email,
    social
  }).then(user => res.status(204).json(user));
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id).then(user => res.json(user));
});

module.exports = router;
