const {
  Model, INTEGER,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Coach, {
        foreignKey: 'coach_id',
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.Like, {
        foreignKey: 'player_id',
      });
    }
  }
  Player.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    team: DataTypes.STRING,
    age: DataTypes.INTEGER,
    photo: DataTypes.TEXT,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    coach_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
