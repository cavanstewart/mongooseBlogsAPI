const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
var ObjectId = require("mongoose").Types.ObjectId;

router.get("/", (req, res) => {
  Blog.find().then(blog => res.json(blog));
});

router.get("/featured", (req, res) => {
  Blog.find()
    .where("featured")
    .equals(true)
    .then(blog => res.json(blog));
});

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id).then(blog => {
    if (!!blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).send();
    }
  });
});

router.post("/", (req, res) => {
  const { title, article, published, featured, author } = req.body;

  let dbUser = null;

  User.findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog({
        title,
        article,
        published,
        featured,
        author
      });
      
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      dbUser.blogs.push(blog);
      dbUser.save().then(() => res.status(201).json(blog));
    });
});

router.put("/:id", (req, res) => {
  const { title, article, published, featured, author } = req.body;
  Blog.findByIdAndUpdate(req.params.id, {
    title,
    article,
    published,
    featured,
    author
  }).then(blog => res.status(204).json(blog));
});

router.delete("/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then(blog => res.json(blog));
});

module.exports = router;
