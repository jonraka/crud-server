const { userModel } = require('../models/userModel');

module.exports = getUsers = async (req, res) => {
    res.send(await userModel.find());
}