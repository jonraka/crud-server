const {
    userModel
} = require('../models/userModel');

module.exports = getUsers = async (req, res) => {
    userModel.find().then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err);
        res.send('Internal error');
    })
}