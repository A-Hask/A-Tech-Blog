const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//get all posts for dashboard
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((dbPostData) => {
      const userPosts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("all-posts-loggedIn", { layout: "dashboard", userPosts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", { layout: "dashboard" });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", { layout: "dashboard", post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
