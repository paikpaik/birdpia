const Post = require("../models/post");
const User = require("../models/user");
const Hashtag = require("../models/hashtag");
const e = require("express");

exports.renderProfile = (req, res, next) => {
  res.render("profile", { title: "내 정보 - BirdPia" });
};

exports.renderJoin = (req, res, next) => {
  res.render("join", { title: "회원 가입 - BirdPia" });
};

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "BirdPia",
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({
        include: [{ model: User, attributes: ["id", "nick"] }],
        order: [["createdAt", "DESC"]],
      });
    }
    res.render("main", {
      title: `${query} | BirdPia`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
