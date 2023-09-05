const express = require("express");
// 쿠키를 위한 cookie-parser
const cookieParser = require("cookie-parser");
// 요청과 응담에 대한 로깅을 위한 morgan
const morgan = require("morgan");
// 디렉토리 경로 간소화를 위한 path(내장모듈)
const path = require("path");
// 로그인에 session을 사용하기 위한 express-session
const session = require("express-session");
// 프론트엔드를 간단하게 넌적스로 해볼거임.
const nunjucks = require("nunjucks");
// 설정파일 .env 불러오는 모듈
const dotenv = require("dotenv");

dotenv.config(); // process.env
// 페이지 라우트 모음
const pageRouter = require("./routes/page");

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev")); // 개발 'dev' 배포 'combined'
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, // js 접근 못하게 막는거
      secure: false, // https 적용할때 true로 바꾸면 됨
    },
  })
);

app.use("/", pageRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  // 에러처리 미들웨어
  // 404 NOT FOUND
  res.locals.message = err.message;
  // 배포 모드일 경우 에러 숨김
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
