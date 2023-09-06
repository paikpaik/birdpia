const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // user === exUser
    done(null, user.id); // user id만 추출
    // 세션 { 1231241231124: 1 } { 세션쿠키: 유저id } -> 메모리에 저장
    // user id만 저장하는것이 아닌 user 전체를 저장해도 됨.
    // 단, 그러면 서버는 메모리 저장공간 부족으로 금방 터짐.
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
