const {post, sequelize} = require('../models')
var Sequelize = require('sequelize');
const {ingredient} = require('../models')
const upload = require('../utils/file');
const multer = require('multer');
const fs = require('fs');
const STATUS_FAILED = 500

async function saveIngredients(postId, ingredients) {

  for (let inputIngredient of ingredients) {

    inputIngredient.trim()
    const savedIngredient = await ingredient.findOne({
      where: {
        ingredient: inputIngredient
      }
    })

    let ingredientId

    if(!savedIngredient) {
      const newIngredient = await ingredient.create({
        ingredient: inputIngredient
      })
      ingredientId = newIngredient.null
    } else {
      ingredientId = savedIngredient.id
    }

    const inputJoinQuery = 'INSERT INTO post_ingredients (post_id, ingredient_id) value(:postId, :ingredientId)'
    const inputJoinValue = {
      postId: postId
      , ingredientId: ingredientId
    }

    await sequelize.query(inputJoinQuery, {replacements: inputJoinValue})
         
  }

}

module.exports =  {
  write: function(req, res) {

    const userId = req.session.userId

    upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(STATUS_FAILED);
      } else if (err) {
        return res.status(STATUS_FAILED);
      }

      const newPostInfo = await post.create({
        title: req.body.title
        , user_id: userId
        , recipe: req.body.recipe
        , image_path : 'images/' + req.file.filename
      })

      const postId = newPostInfo.null
      const ingredients = req.body.tags.split(",")
      saveIngredients(postId, ingredients)
      res.send()  

    })

  }
  , update: async function(req, res) {

    const userId = req.session.userId

    upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(STATUS_FAILED);
      } else if (err) {
        return res.status(STATUS_FAILED);
      }

      if(req.file === undefined){
        
        await post.update(
          {
            title: req.body.title
            , recipe: req.body.recipe
          }
          , {
             where: {
               id: req.body.id
             }
          }
        )

      } else {

        const postInfo = await post.findOne({
          where: {
            id: req.body.id
          }
        })
        
        fs.unlinkSync(postInfo.image_path)
  
        await post.update(
          {
            title: req.body.title
            , recipe: req.body.recipe
            , image_path : 'images/' + req.file.filename
          }
          , {
              where: {
                id: req.body.id
                , user_id: userId
              }
          } 
        )
      }

      const deleteJoinQuery = 'DELETE FROM post_ingredients WHERE post_id = :postId'
      const deleteJoinValue = {
        postId: req.body.id
      }
  
      await sequelize.query(deleteJoinQuery, {replacements: deleteJoinValue})
      let tags = req.body.tags
      saveIngredients(req.body.id, tags.split(","))

      res.send()
    })

  }
  , read: async function(req, res) {
      const postInfo = await post.findOne({
        where: {
          id: req.query.id
        }
      })
      const selectTagsQuery = 
      `select group_concat(ingredients.ingredient) as tags 
      from ingredients, post_ingredients 
      where post_ingredients.post_id = :postId 
        AND ingredients.id = post_ingredients.ingredient_id`
      const selectTagsValue = {
        postId: req.query.id
      }

      const tags = await sequelize.query(selectTagsQuery, {replacements: selectTagsValue})
      res.json({ "postInfo" : postInfo,  "tags": tags})
  }
  , remove: async function(req, res) {

    const userId = req.session.userId

    await post.destroy({
      where: {
        id: req.query.id
        , user_id: userId
      }
    })
    res.send()
  }
  , search: async function(req, res) {
    const searchPostQuery = 
      `select posts.id AS postId
          , posts.title AS title
          , posts.recipe AS recipe
          , posts.created_at AS createdAt
          , posts.image_path AS imagePath
          , users.id AS userId
          , users.nickname AS nickname
        , (
            select group_concat(ingredients.ingredient, "--",ingredients.id)
            from ingredients, post_ingredients 
            where ingredients.id = post_ingredients.ingredient_id
              and post_ingredients.post_id = posts.id
      ) as ingredients
      from posts, users, ingredients, post_ingredients
      where posts.user_id = users.id 
        and post_ingredients.post_id = posts.id
        and ingredients.id = post_ingredients.ingredient_id
        and if(:ingredientId != '', post_ingredients.ingredient_id in (:ingredientId), 1=1)
        and if(:userId != '', users.id = :userId, 1=1)
      group by posts.id
      ORDER BY posts.id DESC
      `
    const searchPostValue = {
        ingredientId: Number(req.query.keyword)
        , userId: req.query.userId
      }
    const result = await sequelize.query(searchPostQuery, {replacements: searchPostValue})
    res.json({"result":result})
  }

};
