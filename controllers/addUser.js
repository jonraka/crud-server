const { userModel } = require('../models/userModel');

/**
* @param {Express.Request} req 
* @param {Express.Response} res 
*/
module.exports = addUser = async (req, res) => {

    const { username } =  req?.query;

    res.send(await userModel.create({
        username: username || 'bob'
    }).catch(err => ({
        error: err.message
    })));
}