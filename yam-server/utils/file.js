const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const crypto = require('crypto');

function getHashedEmail(userId) {
  return crypto.createHmac('sha256', process.env.SECRET_KEY).update(userId).digest('hex')
}

!fs.existsSync('images') && fs.mkdirSync('images')

const storage = multer.diskStorage({

  destination: function(req, file, cb) {
    cb(null, 'images');  // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {
    let hashedUserId = getHashedEmail(req.session.email)
    cb(null, moment().format('YYYYMMDDHHmmss') + "_" + hashedUserId);  // 저장되는 파일명
  }
});

const upload = multer({ storage: storage }).single("file");   // single : 하나의 파일업로드 할때

module.exports = upload;