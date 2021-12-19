const { userModel } = require('../models/userModel');
const {
  sendSuccess,
  sendUserError,
  sendServerError,
} = require('../utils/sender');

module.exports = getUsers = async (req, res) => {
  userModel
    .aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          age: 1,
          email: 1,
        },
      },
    ])
    .then((data) => {
      sendSuccess(res, data);
    })
    .catch((err) => {
      console.log(err);
      sendServerError(res, 'Vidinė klaida #c-gu1');
    });
};
