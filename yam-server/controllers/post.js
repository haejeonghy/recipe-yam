const {post} = require('../models')
const upload = require('../utils/file');
const multer = require('multer');
const moment = require('moment');
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
        , image_path : '/images/' + req.file.filename
      })
      res.send()
    })


  }
};
