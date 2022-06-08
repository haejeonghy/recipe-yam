const {user} = require('../models')

module.exports = {
    join: async function(req, res) {
        console.log(req.body)
        const emailCheckInfo = await user.findOne({
            where : {email: req.body.email}
        })
        if(emailCheckInfo) {
            res.status("409").send("이미 가입한 이메일입니다.");
        } 
        
        const nicknameCheckInfo = await user.findOne({
            where: {nickname: req.body.nickname}
        })

        if(nicknameCheckInfo) {
            res.status("409").send("중복된 닉네임입니다.");
        }
        
        await user.create({
            email: req.body.email
            , nickname: req.body.nickname
            , password: req.body.password
        })
        res.send("200")
        
    }
    , login: async function(req, res) {
        res.send("test")

    }
    , logout: async function(req, res) {
        res.send("test")

    } 
}