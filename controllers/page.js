const Post = require("../models/post");
const User = require("../models/user");

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
