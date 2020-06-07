const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "db.sqlite")
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLoginTime: DataTypes.DATE
  },
  {
    sequelize,
    modelName: "user",
    defaultScope: {
      attributes: { exclude: ["password"] }
    }
  }
);

class Game extends Model {}
Game.init(
  {
    gamename: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    comment: DataTypes.TEXT,
    system: DataTypes.STRING,
    onYear: DataTypes.STRING
  },
  { sequelize, modelName: "game" }
);

class GameType extends Model {}
GameType.init(
  {
    gameTypeName: DataTypes.STRING
  },
  { sequelize, modelName: "gameType" }
);

class Reply extends Model {}
Reply.init(
  {
    content: DataTypes.TEXT
  },
  { sequelize, modelName: "reply" }
);

Game.hasOne(GameType);
Reply.belongsTo(User,{as :'poster'});
Reply.belongsTo(Game);
Reply.hasOne(Reply,{as :'replyTo'});
Game.belongsToMany(User,{through: 'subscription', foreignKey: 'gameId'});
User.belongsToMany(Game,{through: 'subscription', foreignKey: 'userId'});

sequelize.sync();

module.exports = {
  sequelize,
  User,
  Game,
  GameType,
  Reply
};
