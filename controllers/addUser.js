const {
    userModel
} = require('../models/userModel');
const {
    sendSuccess,
    sendUserError,
    sendServerError
} = require('../utils/sender');

module.exports = addUser = (req, res) => {
    const user = new userModel(req.body);

    user.validate(err => {
        if (err) {
            res.sendUserError(res, Object.entries(err.errors).map(([key, error]) => [key, error.kind]))
            return;
        }

        user.save().then(data => {
            if (data._id) {
                sendSuccess(res, 'User created');
            } else {
                sendServerError(res, 'Internal Error #c-au1')
            }
        }).catch(err => {
            if (err.code === 11000) {
                sendUserError(res, 'Email already exits');
            } else {
                sendServerError(res, 'Internal Error #c-au2');
            }
        });

    })
}