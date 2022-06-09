const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
  
      static associate(models) {
      }
    }
    user.init(
      {
        id: {
          type: DataTypes.NUMBER
          , primaryKey: true
        },
        email: DataTypes.STRING
        , password: DataTypes.STRING
        , nickname: DataTypes.STRING
      },
      {
        sequelize
        , modelName: 'user'
        , createdAt: false
        , updatedAt: false
      }
    );
    return user;
  };
  