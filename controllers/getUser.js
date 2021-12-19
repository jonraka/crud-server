const mongoose = require('mongoose');
const { userModel } = require('../models/userModel');
const {
  sendSuccess,
  sendUserError,
  sendServerError,
} = require('../utils/sender');

module.exports = getUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    sendUserError(res, 'Tuščias arba netinkamas identifikatorius');
    return;
  }

  userModel
    .aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
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
      if (data.length) {
        sendSuccess(res, data[0]);
      } else {
        sendUserError(res, 'Vartotojas nerastas');
      }
    })
    .catch((err) => {
      console.log(err);
      sendServerError(res, 'Vidinė klaida #c-gu1');
    });
};
