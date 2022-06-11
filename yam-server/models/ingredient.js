const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ingredient extends Model {
  
      static associate(models) {
      }
    }
    ingredient.init(
      {
        id: {
          type: DataTypes.NUMBER
          , primaryKey: true
        }
        , ingredient: DataTypes.STRING
      },
      {
        sequelize,
        modelName: 'ingredient',
        timestamps: false
      }
    );
    return ingredient;
  };
  