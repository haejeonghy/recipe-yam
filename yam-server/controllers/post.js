const {post} = require('../models')
const upload = require('../utils/file');
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const STATUS_SUCCESS = 200

module.exports =  {
  write: function(req, res) {

    const userId = req.session.userId

    upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500);
      } else if (err) {
        return res.status(500);
      }

      await post.create({
        title: req.body.title
        , user_id: userId
        , recipe: req.body.recipe
        , image_title: req.file.originalname
        , image_path : 'images/' + req.file.filename
      })
      res.send()
    })

  }
  , update: async function(req, res) {

    const userId = req.session.userId

    upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500);
      } else if (err) {
        return res.status(500);
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
        res.send()
        return
      }

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
          , image_title: req.file.originalname
          , image_path : 'images/' + req.file.filename
        }
        , {
            where: {
              id: req.body.id
              , user_id: userId
            }
        } 
      )
      res.send()
    })

  }
  , read: async function(req, res) {
      const postInfo = await post.findOne({
        where: {
          id: req.query.id
        }
      })
      res.json({ "postInfo" : postInfo })
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
};
