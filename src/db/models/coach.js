const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Player, {
        foreignKey: 'coach_id',
      });
    }
  }
  Coach.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Coach',
  });
  return Coach;
};
