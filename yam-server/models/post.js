const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class post extends Model {
  
      static associate(models) {
      }
    }
    post.init(
      {
        id: {
          type: DataTypes.NUMBER
          , primaryKey: true
        }
        , title: DataTypes.STRING
        , user_id: DataTypes.NUMBER
        , created_at: DataTypes.DATE
        , updated_at: DataTypes.DATE
        , recipe: DataTypes.STRING
        , image_title: DataTypes.STRING
        , image_path: DataTypes.STRING
      },
      {
        sequelize,
        modelName: 'post',
        timestamps: false
      }
    );
    return post;
  };
  