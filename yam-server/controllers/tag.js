const { sequelize } = require("../models")

module.exports = {
    tags: async function(req, res) {
        const selectTagsQuery = `SELECT * FROM ingredients`
        sequelize.query(selectTagsQuery).then((result) =>
            res.json({"result":result[0]})
        )
    }   
}