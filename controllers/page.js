exports.renderProfile = (req, res, next) => {
  res.render("profile", { title: "내 정보 - BirdPia" });
};

exports.renderJoin = (req, res, next) => {
  res.render("join", { title: "회원 가입 - BirdPia" });
};

exports.renderMain = (req, res, next) => {
  res.render("main", {
    title: "BirdPia",
    twits: [],
  });
};
