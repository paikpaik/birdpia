const Sequelize = require("sequelize");
const User = require("./user");
const config = require("../config/config")["test"];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// coverage 점수를 올려보기 위한 별 의미없는 테스트.
describe("User 모델", () => {
  test("static initiate 메서드 호출", () => {
    expect(User.initiate(sequelize)).toBe(undefined);
  });
  test("static associate 메서드 호출", () => {
    const db = {
      User: {
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
      },
      Post: {},
    };
    User.associate(db);
    expect(db.User.hasMany).toHaveBeenCalledWith(db.Post);
    expect(db.User.belongsToMany).toHaveBeenCalledTimes(2);
  });
});
