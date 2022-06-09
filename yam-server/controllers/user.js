const {user} = require('../models')

const STATUS_SUCCESS = 200
const STATUS_JOIN_FAIL = 409
const STATUS_LOGIN_FAIL = 401
const STATUS_WRONG_PASSWORD = 401
const crypto = require('crypto');

function getHashedPassword(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex')
}

module.exports = {
    join: async function(req, res) {
        const emailCheckInfo = await user.findOne({
            where : {email: req.body.email}
        })
        if(emailCheckInfo) {
            res.status(STATUS_JOIN_FAIL).send("이미 가입한 이메일입니다.");
            return
        } 
        
        const nicknameCheckInfo = await user.findOne({
            where: {nickname: req.body.nickname}
        })

        if(nicknameCheckInfo) {
            res.status(STATUS_JOIN_FAIL).send("중복된 닉네임입니다.");
            return
        }
        
        const hashedPassword = getHashedPassword(req.body.password)
        await user.create({
            email: req.body.email
            , nickname: req.body.nickname
            , password: hashedPassword
        })
        res.send(STATUS_SUCCESS)
        
    }
    , login: async function(req, res) {
        const hashedPassword = getHashedPassword(req.body.password)
        const userInfo = await user.findOne({
            where: {
                email: req.body.email
                , password: hashedPassword
            }
        })
        if(userInfo) {
            req.session.email = userInfo.email
            req.session.nickname = userInfo.nickname
            req.session.userId = userInfo.id
            res.json({
                "userInfo":userInfo
            })
        } else {
            res.status(STATUS_LOGIN_FAIL).send("잘못된 사용자 정보입니다.")
        }

    }
    , logout: function(req, res) {
        req.session.email = undefined
        req.session.nickname = undefined
        req.session.userId = undefined
        res.status(STATUS_SUCCESS).send()

    }
    , modify: async function(req, res) {
        const hashedPassword = getHashedPassword(req.body.currentPassword)
        const passwordCheckInfo = await user.findOne({
            where : {email: req.body.email, password: hashedPassword}
        })
        if(!passwordCheckInfo) {
            res.status(STATUS_WRONG_PASSWORD).send("비밀 번호가 맞지 않습니다.");
            return
        } 
        
        const nicknameCheckInfo = await user.findOne({
            where: {nickname: req.body.nickname}
        })

        if(nicknameCheckInfo) {
            res.status(STATUS_JOIN_FAIL).send("중복된 닉네임입니다.");
            return
        }
        const hashedNewPassword = getHashedPassword(req.body.newPassword)
        await user.update(
            {
            nickname: req.body.nickname
            , password: hashedNewPassword
            }
            , {
                where: {
                    email: req.body.email
                }
            }
        ).then(()=> {
            const userInfo = user.findOne({
                where : {email: req.body.email}
            }).then((userInfo) => {
                res.json({"userInfo":userInfo})
            })
        })
    }
}